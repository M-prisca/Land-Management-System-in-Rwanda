package rw.landManagementSystem.LandSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.model.UserRole;
import rw.landManagementSystem.LandSystem.model.UserStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find by unique identifiers
    Optional<User> findByEmail(String email);
    Optional<User> findByNationalId(String nationalId);
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    // Check existence
    boolean existsByEmail(String email);
    boolean existsByNationalId(String nationalId);
    boolean existsByPhoneNumber(String phoneNumber);
    
    // Find by role and status
    List<User> findByRole(UserRole role);
    List<User> findByStatus(UserStatus status);
    List<User> findByRoleAndStatus(UserRole role, UserStatus status);
    
    // Find active users
    @Query("SELECT u FROM User u WHERE u.status = 'ACTIVE'")
    List<User> findAllActiveUsers();
    
    // Find land officers
    @Query("SELECT u FROM User u WHERE u.role = 'LAND_OFFICER' AND u.status = 'ACTIVE'")
    List<User> findActiveLandOfficers();
    
    // Search by name
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :name, '%')) " +
           "OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
           "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findByNameContaining(@Param("name") String name);
    
    // Find users with land ownership
    @Query("SELECT DISTINCT u FROM User u JOIN u.ownerships o WHERE o.status = 'ACTIVE'")
    List<User> findUsersWithActiveLandOwnership();
    
    // Find users by location
    @Query("SELECT u FROM User u WHERE LOWER(u.address) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<User> findByAddressContaining(@Param("location") String location);
    
    // Count users by role
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") UserRole role);
    
    // Count active users
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = 'ACTIVE'")
    long countActiveUsers();
}
