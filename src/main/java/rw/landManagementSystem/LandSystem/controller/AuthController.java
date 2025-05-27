package rw.landManagementSystem.LandSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.dto.AuthRequest;
import rw.landManagementSystem.LandSystem.dto.AuthResponse;
import rw.landManagementSystem.LandSystem.dto.RegisterRequest;
import rw.landManagementSystem.LandSystem.dto.TwoFactorRequest;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.security.CustomUserDetailsService;
import rw.landManagementSystem.LandSystem.security.JwtUtil;
import rw.landManagementSystem.LandSystem.service.AuthService;
import rw.landManagementSystem.LandSystem.service.UserService;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            CustomUserDetailsService.CustomUserPrincipal userPrincipal = 
                (CustomUserDetailsService.CustomUserPrincipal) userDetails;
            User user = userPrincipal.getUser();

            // Check if 2FA is enabled
            if (user.getTwoFactorEnabled()) {
                // Generate temporary token for 2FA verification
                Map<String, Object> claims = new HashMap<>();
                claims.put("twoFactorPending", true);
                String tempToken = jwtUtil.generateToken(userDetails, claims);
                
                return ResponseEntity.ok(new AuthResponse(tempToken, null, true, "2FA verification required"));
            }

            // Generate full access token
            String token = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthResponse(token, user, false, "Login successful"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/verify-2fa")
    public ResponseEntity<?> verify2FA(@Valid @RequestBody TwoFactorRequest request) {
        try {
            boolean isValid = authService.verifyTwoFactorCode(request.getEmail(), request.getCode());
            
            if (isValid) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
                CustomUserDetailsService.CustomUserPrincipal userPrincipal = 
                    (CustomUserDetailsService.CustomUserPrincipal) userDetails;
                User user = userPrincipal.getUser();
                
                String token = jwtUtil.generateToken(userDetails);
                return ResponseEntity.ok(new AuthResponse(token, user, false, "2FA verification successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid 2FA code"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "2FA verification failed"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
            }

            User user = new User();
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());
            user.setEmail(registerRequest.getEmail());
            user.setPhoneNumber(registerRequest.getPhoneNumber());
            user.setNationalId(registerRequest.getNationalId());
            user.setAddress(registerRequest.getAddress());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setRole(registerRequest.getRole());

            User savedUser = userService.save(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", savedUser.getId()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            authService.initiatePasswordReset(email);
            return ResponseEntity.ok(Map.of("message", "Password reset email sent"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to send reset email"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("password");
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password reset successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password reset failed"));
        }
    }
}
