package rw.landManagementSystem.LandSystem.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.model.UserRole;
import rw.landManagementSystem.LandSystem.model.UserStatus;
import rw.landManagementSystem.LandSystem.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create and Update operations
    public User createUser(User user) {
        validateUserForCreation(user);
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User existingUser = getUserById(id);
        updateUserFields(existingUser, userDetails);
        return userRepository.save(existingUser);
    }

    // Read operations
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findUserByNationalId(String nationalId) {
        return userRepository.findByNationalId(nationalId);
    }

    public Optional<User> findUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public List<User> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    public List<User> getUsersByStatus(UserStatus status) {
        return userRepository.findByStatus(status);
    }

    public List<User> getActiveUsers() {
        return userRepository.findAllActiveUsers();
    }

    public List<User> getActiveLandOfficers() {
        return userRepository.findActiveLandOfficers();
    }

    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContaining(name);
    }

    public List<User> getUsersWithActiveLandOwnership() {
        return userRepository.findUsersWithActiveLandOwnership();
    }

    public List<User> getUsersByLocation(String location) {
        return userRepository.findByAddressContaining(location);
    }

    // Delete operations
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public void deactivateUser(Long id) {
        User user = getUserById(id);
        user.setStatus(UserStatus.INACTIVE);
        userRepository.save(user);
    }

    public void activateUser(Long id) {
        User user = getUserById(id);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
    }

    public void suspendUser(Long id) {
        User user = getUserById(id);
        user.setStatus(UserStatus.SUSPENDED);
        userRepository.save(user);
    }

    // Statistics and counts
    public long getTotalUserCount() {
        return userRepository.count();
    }

    public long getActiveUserCount() {
        return userRepository.countActiveUsers();
    }

    public long getUserCountByRole(UserRole role) {
        return userRepository.countByRole(role);
    }

    // Validation methods
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    public boolean isNationalIdAvailable(String nationalId) {
        return !userRepository.existsByNationalId(nationalId);
    }

    public boolean isPhoneNumberAvailable(String phoneNumber) {
        return !userRepository.existsByPhoneNumber(phoneNumber);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // Paginated search with filters
    public Page<User> getUsersWithFilters(String search, UserRole role, UserStatus status, Pageable pageable) {
        return userRepository.findUsersWithFilters(search, role, status, pageable);
    }

    // Private helper methods
    private void validateUserForCreation(User user) {
        if (!isEmailAvailable(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        if (!isNationalIdAvailable(user.getNationalId())) {
            throw new RuntimeException("National ID already exists: " + user.getNationalId());
        }
        if (!isPhoneNumberAvailable(user.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists: " + user.getPhoneNumber());
        }
    }

    private void updateUserFields(User existingUser, User userDetails) {
        if (userDetails.getFirstName() != null) {
            existingUser.setFirstName(userDetails.getFirstName());
        }
        if (userDetails.getLastName() != null) {
            existingUser.setLastName(userDetails.getLastName());
        }
        if (userDetails.getEmail() != null && !userDetails.getEmail().equals(existingUser.getEmail())) {
            if (!isEmailAvailable(userDetails.getEmail())) {
                throw new RuntimeException("Email already exists: " + userDetails.getEmail());
            }
            existingUser.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPhoneNumber() != null && !userDetails.getPhoneNumber().equals(existingUser.getPhoneNumber())) {
            if (!isPhoneNumberAvailable(userDetails.getPhoneNumber())) {
                throw new RuntimeException("Phone number already exists: " + userDetails.getPhoneNumber());
            }
            existingUser.setPhoneNumber(userDetails.getPhoneNumber());
        }
        if (userDetails.getAddress() != null) {
            existingUser.setAddress(userDetails.getAddress());
        }
        if (userDetails.getRole() != null) {
            existingUser.setRole(userDetails.getRole());
        }
        if (userDetails.getStatus() != null) {
            existingUser.setStatus(userDetails.getStatus());
        }
    }
}
