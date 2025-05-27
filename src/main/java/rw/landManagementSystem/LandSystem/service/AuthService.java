package rw.landManagementSystem.LandSystem.service;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final GoogleAuthenticator gAuth = new GoogleAuthenticator();

    public String generateTwoFactorSecret(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            GoogleAuthenticatorKey key = gAuth.createCredentials();
            String secret = key.getKey();
            
            user.setTwoFactorSecret(secret);
            userRepository.save(user);
            
            return secret;
        }
        throw new RuntimeException("User not found");
    }

    public String generateQRCodeUrl(String email, String secret) {
        return GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
            "Land Management System", 
            email, 
            gAuth.createCredentials(secret)
        );
    }

    public boolean verifyTwoFactorCode(String email, String code) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getTwoFactorSecret() != null) {
                return gAuth.authorize(user.getTwoFactorSecret(), Integer.parseInt(code));
            }
        }
        return false;
    }

    public void enableTwoFactor(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setTwoFactorEnabled(true);
            userRepository.save(user);
        }
    }

    public void disableTwoFactor(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setTwoFactorEnabled(false);
            user.setTwoFactorSecret(null);
            userRepository.save(user);
        }
    }

    public void initiatePasswordReset(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String resetToken = UUID.randomUUID().toString();
            user.setPasswordResetToken(resetToken);
            user.setPasswordResetExpires(LocalDateTime.now().plusHours(1)); // 1 hour expiry
            userRepository.save(user);

            sendPasswordResetEmail(email, resetToken);
        }
    }

    public void resetPassword(String token, String newPassword) {
        Optional<User> userOpt = userRepository.findByPasswordResetToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPasswordResetExpires().isAfter(LocalDateTime.now())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setPasswordResetToken(null);
                user.setPasswordResetExpires(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Password reset token has expired");
            }
        } else {
            throw new RuntimeException("Invalid password reset token");
        }
    }

    private void sendPasswordResetEmail(String email, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset - Land Management System");
            message.setText("Click the following link to reset your password: " +
                "http://localhost:5173/reset-password?token=" + token +
                "\n\nThis link will expire in 1 hour.");
            
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
}
