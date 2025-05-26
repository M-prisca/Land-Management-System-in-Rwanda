package rw.landManagementSystem.LandSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.landManagementSystem.LandSystem.model.LandParcel;
import rw.landManagementSystem.LandSystem.model.LandStatus;
import rw.landManagementSystem.LandSystem.model.LandUse;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface LandParcelRepository extends JpaRepository<LandParcel, Long> {
    
    // Find by unique identifier
    Optional<LandParcel> findByParcelNumber(String parcelNumber);
    
    // Check existence
    boolean existsByParcelNumber(String parcelNumber);
    
    // Find by location
    List<LandParcel> findByDistrict(String district);
    List<LandParcel> findBySector(String sector);
    List<LandParcel> findByCell(String cell);
    List<LandParcel> findByDistrictAndSector(String district, String sector);
    List<LandParcel> findByDistrictAndSectorAndCell(String district, String sector, String cell);
    
    // Find by status and land use
    List<LandParcel> findByStatus(LandStatus status);
    List<LandParcel> findByLandUse(LandUse landUse);
    List<LandParcel> findByStatusAndLandUse(LandStatus status, LandUse landUse);
    
    // Find available land parcels
    @Query("SELECT lp FROM LandParcel lp WHERE lp.status = 'AVAILABLE'")
    List<LandParcel> findAvailableParcels();
    
    // Find by area range
    @Query("SELECT lp FROM LandParcel lp WHERE lp.areaSqm BETWEEN :minArea AND :maxArea")
    List<LandParcel> findByAreaRange(@Param("minArea") BigDecimal minArea, @Param("maxArea") BigDecimal maxArea);
    
    // Find by market value range
    @Query("SELECT lp FROM LandParcel lp WHERE lp.marketValue BETWEEN :minValue AND :maxValue")
    List<LandParcel> findByMarketValueRange(@Param("minValue") BigDecimal minValue, @Param("maxValue") BigDecimal maxValue);
    
    // Search by location containing
    @Query("SELECT lp FROM LandParcel lp WHERE " +
           "LOWER(lp.location) LIKE LOWER(CONCAT('%', :location, '%')) " +
           "OR LOWER(lp.district) LIKE LOWER(CONCAT('%', :location, '%')) " +
           "OR LOWER(lp.sector) LIKE LOWER(CONCAT('%', :location, '%')) " +
           "OR LOWER(lp.cell) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<LandParcel> findByLocationContaining(@Param("location") String location);
    
    // Find parcels with active ownership
    @Query("SELECT DISTINCT lp FROM LandParcel lp JOIN lp.ownerships o WHERE o.status = 'ACTIVE'")
    List<LandParcel> findParcelsWithActiveOwnership();
    
    // Find parcels without ownership
    @Query("SELECT lp FROM LandParcel lp WHERE lp.id NOT IN " +
           "(SELECT DISTINCT o.landParcel.id FROM Ownership o WHERE o.status = 'ACTIVE')")
    List<LandParcel> findParcelsWithoutOwnership();
    
    // Find parcels by owner
    @Query("SELECT DISTINCT lp FROM LandParcel lp JOIN lp.ownerships o WHERE o.user.id = :userId AND o.status = 'ACTIVE'")
    List<LandParcel> findParcelsByOwner(@Param("userId") Long userId);
    
    // Count by status
    @Query("SELECT COUNT(lp) FROM LandParcel lp WHERE lp.status = :status")
    long countByStatus(@Param("status") LandStatus status);
    
    // Count by land use
    @Query("SELECT COUNT(lp) FROM LandParcel lp WHERE lp.landUse = :landUse")
    long countByLandUse(@Param("landUse") LandUse landUse);
    
    // Calculate total area by district
    @Query("SELECT SUM(lp.areaSqm) FROM LandParcel lp WHERE lp.district = :district")
    BigDecimal getTotalAreaByDistrict(@Param("district") String district);
    
    // Calculate total market value
    @Query("SELECT SUM(lp.marketValue) FROM LandParcel lp WHERE lp.marketValue IS NOT NULL")
    BigDecimal getTotalMarketValue();
}
