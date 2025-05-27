package rw.landManagementSystem.LandSystem.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.model.UserRole;
import rw.landManagementSystem.LandSystem.model.UserStatus;
import rw.landManagementSystem.LandSystem.service.UserService;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create user
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get users with pagination and filters
    @GetMapping("/paginated")
    public ResponseEntity<Map<String, Object>> getUsersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) UserStatus status) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ?
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<User> userPage = userService.getUsersWithFilters(search, role, status, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("users", userPage.getContent());
        response.put("currentPage", userPage.getNumber());
        response.put("totalItems", userPage.getTotalElements());
        response.put("totalPages", userPage.getTotalPages());
        response.put("pageSize", userPage.getSize());
        response.put("hasNext", userPage.hasNext());
        response.put("hasPrevious", userPage.hasPrevious());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Update user
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('LAND_OFFICER') and @userService.getUserById(#id).role != T(rw.landManagementSystem.LandSystem.model.UserRole).ADMIN)")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                  .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get user by national ID
    @GetMapping("/national-id/{nationalId}")
    public ResponseEntity<User> getUserByNationalId(@PathVariable String nationalId) {
        Optional<User> user = userService.findUserByNationalId(nationalId);
        return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                  .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get user by phone number
    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<User> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        Optional<User> user = userService.findUserByPhoneNumber(phoneNumber);
        return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                  .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get users by role
    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable UserRole role) {
        List<User> users = userService.getUsersByRole(role);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get users by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<User>> getUsersByStatus(@PathVariable UserStatus status) {
        List<User> users = userService.getUsersByStatus(status);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get active users
    @GetMapping("/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> users = userService.getActiveUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get active land officers
    @GetMapping("/land-officers")
    public ResponseEntity<List<User>> getActiveLandOfficers() {
        List<User> officers = userService.getActiveLandOfficers();
        return new ResponseEntity<>(officers, HttpStatus.OK);
    }

    // Search users by name
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsersByName(@RequestParam String name) {
        List<User> users = userService.searchUsersByName(name);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get users with active land ownership
    @GetMapping("/landowners")
    public ResponseEntity<List<User>> getUsersWithActiveLandOwnership() {
        List<User> users = userService.getUsersWithActiveLandOwnership();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get users by location
    @GetMapping("/location")
    public ResponseEntity<List<User>> getUsersByLocation(@RequestParam String location) {
        List<User> users = userService.getUsersByLocation(location);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Activate user
    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable Long id) {
        try {
            userService.activateUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deactivate user
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        try {
            userService.deactivateUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Suspend user
    @PatchMapping("/{id}/suspend")
    public ResponseEntity<Void> suspendUser(@PathVariable Long id) {
        try {
            userService.suspendUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get user statistics
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalUserCount() {
        long count = userService.getTotalUserCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/active")
    public ResponseEntity<Long> getActiveUserCount() {
        long count = userService.getActiveUserCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/role/{role}")
    public ResponseEntity<Long> getUserCountByRole(@PathVariable UserRole role) {
        long count = userService.getUserCountByRole(role);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Validation endpoints
    @GetMapping("/validate/email/{email}")
    public ResponseEntity<Boolean> isEmailAvailable(@PathVariable String email) {
        boolean available = userService.isEmailAvailable(email);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }

    @GetMapping("/validate/national-id/{nationalId}")
    public ResponseEntity<Boolean> isNationalIdAvailable(@PathVariable String nationalId) {
        boolean available = userService.isNationalIdAvailable(nationalId);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }

    @GetMapping("/validate/phone/{phoneNumber}")
    public ResponseEntity<Boolean> isPhoneNumberAvailable(@PathVariable String phoneNumber) {
        boolean available = userService.isPhoneNumberAvailable(phoneNumber);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }
}
