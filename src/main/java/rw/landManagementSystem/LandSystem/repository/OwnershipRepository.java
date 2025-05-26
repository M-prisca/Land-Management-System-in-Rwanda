package rw.landManagementSystem.LandSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.landManagementSystem.LandSystem.model.Ownership;
import rw.landManagementSystem.LandSystem.model.OwnershipStatus;
import rw.landManagementSystem.LandSystem.model.OwnershipType;
import rw.landManagementSystem.LandSystem.model.AcquisitionMethod;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OwnershipRepository extends JpaRepository<Ownership, Long> {
    
    // Find by user
    List<Ownership> findByUserId(Long userId);
    List<Ownership> findByUserIdAndStatus(Long userId, OwnershipStatus status);
    
    // Find by land parcel
    List<Ownership> findByLandParcelId(Long landParcelId);
    List<Ownership> findByLandParcelIdAndStatus(Long landParcelId, OwnershipStatus status);
    
    // Find active ownerships
    @Query("SELECT o FROM Ownership o WHERE o.status = 'ACTIVE'")
    List<Ownership> findAllActiveOwnerships();
    
    // Find by user and land parcel
    Optional<Ownership> findByUserIdAndLandParcelId(Long userId, Long landParcelId);
    
    @Query("SELECT o FROM Ownership o WHERE o.user.id = :userId AND o.landParcel.id = :landParcelId AND o.status = 'ACTIVE'")
    Optional<Ownership> findActiveOwnershipByUserAndLandParcel(@Param("userId") Long userId, @Param("landParcelId") Long landParcelId);
    
    // Find by ownership type
    List<Ownership> findByOwnershipType(OwnershipType ownershipType);
    List<Ownership> findByOwnershipTypeAndStatus(OwnershipType ownershipType, OwnershipStatus status);
    
    // Find by acquisition method
    List<Ownership> findByAcquisitionMethod(AcquisitionMethod acquisitionMethod);
    
    // Find by title deed number
    Optional<Ownership> findByTitleDeedNumber(String titleDeedNumber);
    
    // Find by date range
    @Query("SELECT o FROM Ownership o WHERE o.acquisitionDate BETWEEN :startDate AND :endDate")
    List<Ownership> findByAcquisitionDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Find by ownership percentage range
    @Query("SELECT o FROM Ownership o WHERE o.ownershipPercentage BETWEEN :minPercentage AND :maxPercentage")
    List<Ownership> findByOwnershipPercentageRange(@Param("minPercentage") BigDecimal minPercentage, @Param("maxPercentage") BigDecimal maxPercentage);
    
    // Find full ownerships (100%)
    @Query("SELECT o FROM Ownership o WHERE o.ownershipPercentage = 100.00 AND o.status = 'ACTIVE'")
    List<Ownership> findFullOwnerships();
    
    // Find partial ownerships (less than 100%)
    @Query("SELECT o FROM Ownership o WHERE o.ownershipPercentage < 100.00 AND o.status = 'ACTIVE'")
    List<Ownership> findPartialOwnerships();
    
    // Find ownerships by land parcel with total percentage
    @Query("SELECT o FROM Ownership o WHERE o.landParcel.id = :landParcelId AND o.status = 'ACTIVE' ORDER BY o.ownershipPercentage DESC")
    List<Ownership> findActiveOwnershipsByLandParcel(@Param("landParcelId") Long landParcelId);
    
    // Calculate total ownership percentage for a land parcel
    @Query("SELECT SUM(o.ownershipPercentage) FROM Ownership o WHERE o.landParcel.id = :landParcelId AND o.status = 'ACTIVE'")
    BigDecimal getTotalOwnershipPercentageByLandParcel(@Param("landParcelId") Long landParcelId);
    
    // Find disputed ownerships
    @Query("SELECT o FROM Ownership o WHERE o.status = 'DISPUTED'")
    List<Ownership> findDisputedOwnerships();
    
    // Find expiring ownerships (for leasehold, etc.)
    @Query("SELECT o FROM Ownership o WHERE o.endDate IS NOT NULL AND o.endDate <= :date AND o.status = 'ACTIVE'")
    List<Ownership> findExpiringOwnerships(@Param("date") LocalDate date);
    
    // Count ownerships by user
    @Query("SELECT COUNT(o) FROM Ownership o WHERE o.user.id = :userId AND o.status = 'ACTIVE'")
    long countActiveOwnershipsByUser(@Param("userId") Long userId);
    
    // Count ownerships by status
    @Query("SELECT COUNT(o) FROM Ownership o WHERE o.status = :status")
    long countByStatus(@Param("status") OwnershipStatus status);
    
    // Find recent transfers
    @Query("SELECT o FROM Ownership o WHERE o.acquisitionMethod = 'PURCHASE' AND o.acquisitionDate >= :date ORDER BY o.acquisitionDate DESC")
    List<Ownership> findRecentTransfers(@Param("date") LocalDate date);
    
    // Check if land parcel has multiple owners
    @Query("SELECT COUNT(o) > 1 FROM Ownership o WHERE o.landParcel.id = :landParcelId AND o.status = 'ACTIVE'")
    boolean hasMultipleOwners(@Param("landParcelId") Long landParcelId);
}
