package rw.landManagementSystem.LandSystem.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.landManagementSystem.LandSystem.model.LandParcel;
import rw.landManagementSystem.LandSystem.model.LandStatus;
import rw.landManagementSystem.LandSystem.model.LandUse;
import rw.landManagementSystem.LandSystem.repository.LandParcelRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LandParcelService {

    private final LandParcelRepository landParcelRepository;

    public LandParcelService(LandParcelRepository landParcelRepository) {
        this.landParcelRepository = landParcelRepository;
    }

    // Create and Update operations
    public LandParcel createLandParcel(LandParcel landParcel) {
        validateLandParcelForCreation(landParcel);
        return landParcelRepository.save(landParcel);
    }

    public LandParcel updateLandParcel(Long id, LandParcel landParcelDetails) {
        LandParcel existingLandParcel = getLandParcelById(id);
        updateLandParcelFields(existingLandParcel, landParcelDetails);
        return landParcelRepository.save(existingLandParcel);
    }

    // Read operations
    public List<LandParcel> getAllLandParcels() {
        return landParcelRepository.findAll();
    }

    public LandParcel getLandParcelById(Long id) {
        return landParcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Land parcel not found with id: " + id));
    }

    public Optional<LandParcel> findLandParcelByParcelNumber(String parcelNumber) {
        return landParcelRepository.findByParcelNumber(parcelNumber);
    }

    public List<LandParcel> getLandParcelsByDistrict(String district) {
        return landParcelRepository.findByDistrict(district);
    }

    public List<LandParcel> getLandParcelsBySector(String sector) {
        return landParcelRepository.findBySector(sector);
    }

    public List<LandParcel> getLandParcelsByCell(String cell) {
        return landParcelRepository.findByCell(cell);
    }

    public List<LandParcel> getLandParcelsByLocation(String district, String sector, String cell) {
        return landParcelRepository.findByDistrictAndSectorAndCell(district, sector, cell);
    }

    public List<LandParcel> getLandParcelsByStatus(LandStatus status) {
        return landParcelRepository.findByStatus(status);
    }

    public List<LandParcel> getLandParcelsByLandUse(LandUse landUse) {
        return landParcelRepository.findByLandUse(landUse);
    }

    public List<LandParcel> getAvailableLandParcels() {
        return landParcelRepository.findAvailableParcels();
    }

    public List<LandParcel> getLandParcelsByAreaRange(BigDecimal minArea, BigDecimal maxArea) {
        return landParcelRepository.findByAreaRange(minArea, maxArea);
    }

    public List<LandParcel> getLandParcelsByMarketValueRange(BigDecimal minValue, BigDecimal maxValue) {
        return landParcelRepository.findByMarketValueRange(minValue, maxValue);
    }

    public List<LandParcel> searchLandParcelsByLocation(String location) {
        return landParcelRepository.findByLocationContaining(location);
    }

    public List<LandParcel> getLandParcelsWithActiveOwnership() {
        return landParcelRepository.findParcelsWithActiveOwnership();
    }

    public List<LandParcel> getLandParcelsWithoutOwnership() {
        return landParcelRepository.findParcelsWithoutOwnership();
    }

    public List<LandParcel> getLandParcelsByOwner(Long userId) {
        return landParcelRepository.findParcelsByOwner(userId);
    }

    // Delete operations
    public void deleteLandParcel(Long id) {
        LandParcel landParcel = getLandParcelById(id);
        landParcelRepository.delete(landParcel);
    }

    // Status management
    public void updateLandParcelStatus(Long id, LandStatus status) {
        LandParcel landParcel = getLandParcelById(id);
        landParcel.setStatus(status);
        landParcelRepository.save(landParcel);
    }

    public void markAsOccupied(Long id) {
        updateLandParcelStatus(id, LandStatus.OCCUPIED);
    }

    public void markAsAvailable(Long id) {
        updateLandParcelStatus(id, LandStatus.AVAILABLE);
    }

    public void markAsDisputed(Long id) {
        updateLandParcelStatus(id, LandStatus.DISPUTED);
    }

    public void markAsReserved(Long id) {
        updateLandParcelStatus(id, LandStatus.RESERVED);
    }

    public void markAsUnderTransfer(Long id) {
        updateLandParcelStatus(id, LandStatus.UNDER_TRANSFER);
    }

    // Statistics and calculations
    public long getTotalLandParcelCount() {
        return landParcelRepository.count();
    }

    public long getLandParcelCountByStatus(LandStatus status) {
        return landParcelRepository.countByStatus(status);
    }

    public long getLandParcelCountByLandUse(LandUse landUse) {
        return landParcelRepository.countByLandUse(landUse);
    }

    public BigDecimal getTotalAreaByDistrict(String district) {
        return landParcelRepository.getTotalAreaByDistrict(district);
    }

    public BigDecimal getTotalMarketValue() {
        return landParcelRepository.getTotalMarketValue();
    }

    // Validation methods
    public boolean isParcelNumberAvailable(String parcelNumber) {
        return !landParcelRepository.existsByParcelNumber(parcelNumber);
    }

    // Private helper methods
    private void validateLandParcelForCreation(LandParcel landParcel) {
        if (!isParcelNumberAvailable(landParcel.getParcelNumber())) {
            throw new RuntimeException("Parcel number already exists: " + landParcel.getParcelNumber());
        }
        if (landParcel.getAreaSqm().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Area must be greater than zero");
        }
    }

    private void updateLandParcelFields(LandParcel existingLandParcel, LandParcel landParcelDetails) {
        if (landParcelDetails.getParcelNumber() != null &&
            !landParcelDetails.getParcelNumber().equals(existingLandParcel.getParcelNumber())) {
            if (!isParcelNumberAvailable(landParcelDetails.getParcelNumber())) {
                throw new RuntimeException("Parcel number already exists: " + landParcelDetails.getParcelNumber());
            }
            existingLandParcel.setParcelNumber(landParcelDetails.getParcelNumber());
        }
        if (landParcelDetails.getLocation() != null) {
            existingLandParcel.setLocation(landParcelDetails.getLocation());
        }
        if (landParcelDetails.getDistrict() != null) {
            existingLandParcel.setDistrict(landParcelDetails.getDistrict());
        }
        if (landParcelDetails.getSector() != null) {
            existingLandParcel.setSector(landParcelDetails.getSector());
        }
        if (landParcelDetails.getCell() != null) {
            existingLandParcel.setCell(landParcelDetails.getCell());
        }
        if (landParcelDetails.getAreaSqm() != null) {
            if (landParcelDetails.getAreaSqm().compareTo(BigDecimal.ZERO) <= 0) {
                throw new RuntimeException("Area must be greater than zero");
            }
            existingLandParcel.setAreaSqm(landParcelDetails.getAreaSqm());
        }
        if (landParcelDetails.getLandUse() != null) {
            existingLandParcel.setLandUse(landParcelDetails.getLandUse());
        }
        if (landParcelDetails.getStatus() != null) {
            existingLandParcel.setStatus(landParcelDetails.getStatus());
        }
        if (landParcelDetails.getDescription() != null) {
            existingLandParcel.setDescription(landParcelDetails.getDescription());
        }
        if (landParcelDetails.getCoordinates() != null) {
            existingLandParcel.setCoordinates(landParcelDetails.getCoordinates());
        }
        if (landParcelDetails.getMarketValue() != null) {
            existingLandParcel.setMarketValue(landParcelDetails.getMarketValue());
        }
    }
}
