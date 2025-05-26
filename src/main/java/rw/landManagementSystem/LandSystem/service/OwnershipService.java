package rw.landManagementSystem.LandSystem.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.landManagementSystem.LandSystem.model.Ownership;
import rw.landManagementSystem.LandSystem.model.OwnershipStatus;
import rw.landManagementSystem.LandSystem.model.OwnershipType;
import rw.landManagementSystem.LandSystem.model.AcquisitionMethod;
import rw.landManagementSystem.LandSystem.repository.OwnershipRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OwnershipService {

    private final OwnershipRepository ownershipRepository;

    public OwnershipService(OwnershipRepository ownershipRepository) {
        this.ownershipRepository = ownershipRepository;
    }

    // Create and Update operations
    public Ownership createOwnership(Ownership ownership) {
        validateOwnershipForCreation(ownership);
        return ownershipRepository.save(ownership);
    }

    public Ownership updateOwnership(Long id, Ownership ownershipDetails) {
        Ownership existingOwnership = getOwnershipById(id);
        updateOwnershipFields(existingOwnership, ownershipDetails);
        return ownershipRepository.save(existingOwnership);
    }

    // Read operations
    public List<Ownership> getAllOwnerships() {
        return ownershipRepository.findAll();
    }

    public Ownership getOwnershipById(Long id) {
        return ownershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ownership not found with id: " + id));
    }

    public List<Ownership> getOwnershipsByUser(Long userId) {
        return ownershipRepository.findByUserId(userId);
    }

    public List<Ownership> getActiveOwnershipsByUser(Long userId) {
        return ownershipRepository.findByUserIdAndStatus(userId, OwnershipStatus.ACTIVE);
    }

    public List<Ownership> getOwnershipsByLandParcel(Long landParcelId) {
        return ownershipRepository.findByLandParcelId(landParcelId);
    }

    public List<Ownership> getActiveOwnershipsByLandParcel(Long landParcelId) {
        return ownershipRepository.findActiveOwnershipsByLandParcel(landParcelId);
    }

    public Optional<Ownership> findOwnershipByUserAndLandParcel(Long userId, Long landParcelId) {
        return ownershipRepository.findByUserIdAndLandParcelId(userId, landParcelId);
    }

    public Optional<Ownership> findActiveOwnershipByUserAndLandParcel(Long userId, Long landParcelId) {
        return ownershipRepository.findActiveOwnershipByUserAndLandParcel(userId, landParcelId);
    }

    public List<Ownership> getAllActiveOwnerships() {
        return ownershipRepository.findAllActiveOwnerships();
    }

    public List<Ownership> getOwnershipsByType(OwnershipType ownershipType) {
        return ownershipRepository.findByOwnershipType(ownershipType);
    }

    public List<Ownership> getOwnershipsByAcquisitionMethod(AcquisitionMethod acquisitionMethod) {
        return ownershipRepository.findByAcquisitionMethod(acquisitionMethod);
    }

    public Optional<Ownership> findOwnershipByTitleDeedNumber(String titleDeedNumber) {
        return ownershipRepository.findByTitleDeedNumber(titleDeedNumber);
    }

    public List<Ownership> getOwnershipsByDateRange(LocalDate startDate, LocalDate endDate) {
        return ownershipRepository.findByAcquisitionDateBetween(startDate, endDate);
    }

    public List<Ownership> getOwnershipsByPercentageRange(BigDecimal minPercentage, BigDecimal maxPercentage) {
        return ownershipRepository.findByOwnershipPercentageRange(minPercentage, maxPercentage);
    }

    public List<Ownership> getFullOwnerships() {
        return ownershipRepository.findFullOwnerships();
    }

    public List<Ownership> getPartialOwnerships() {
        return ownershipRepository.findPartialOwnerships();
    }

    public List<Ownership> getDisputedOwnerships() {
        return ownershipRepository.findDisputedOwnerships();
    }

    public List<Ownership> getExpiringOwnerships(LocalDate date) {
        return ownershipRepository.findExpiringOwnerships(date);
    }

    public List<Ownership> getRecentTransfers(LocalDate date) {
        return ownershipRepository.findRecentTransfers(date);
    }

    // Delete operations
    public void deleteOwnership(Long id) {
        Ownership ownership = getOwnershipById(id);
        ownershipRepository.delete(ownership);
    }

    // Status management
    public void updateOwnershipStatus(Long id, OwnershipStatus status) {
        Ownership ownership = getOwnershipById(id);
        ownership.setStatus(status);
        if (status == OwnershipStatus.TRANSFERRED || status == OwnershipStatus.INACTIVE) {
            ownership.setEndDate(LocalDate.now());
        }
        ownershipRepository.save(ownership);
    }

    public void activateOwnership(Long id) {
        updateOwnershipStatus(id, OwnershipStatus.ACTIVE);
    }

    public void deactivateOwnership(Long id) {
        updateOwnershipStatus(id, OwnershipStatus.INACTIVE);
    }

    public void transferOwnership(Long id) {
        updateOwnershipStatus(id, OwnershipStatus.TRANSFERRED);
    }

    public void disputeOwnership(Long id) {
        updateOwnershipStatus(id, OwnershipStatus.DISPUTED);
    }

    public void suspendOwnership(Long id) {
        updateOwnershipStatus(id, OwnershipStatus.SUSPENDED);
    }

    // Business logic methods
    public BigDecimal getTotalOwnershipPercentageByLandParcel(Long landParcelId) {
        BigDecimal total = ownershipRepository.getTotalOwnershipPercentageByLandParcel(landParcelId);
        return total != null ? total : BigDecimal.ZERO;
    }

    public boolean hasMultipleOwners(Long landParcelId) {
        return ownershipRepository.hasMultipleOwners(landParcelId);
    }

    public boolean canAddOwnership(Long landParcelId, BigDecimal ownershipPercentage) {
        BigDecimal currentTotal = getTotalOwnershipPercentageByLandParcel(landParcelId);
        return currentTotal.add(ownershipPercentage).compareTo(new BigDecimal("100.00")) <= 0;
    }

    // Statistics and counts
    public long getTotalOwnershipCount() {
        return ownershipRepository.count();
    }

    public long getActiveOwnershipCountByUser(Long userId) {
        return ownershipRepository.countActiveOwnershipsByUser(userId);
    }

    public long getOwnershipCountByStatus(OwnershipStatus status) {
        return ownershipRepository.countByStatus(status);
    }

    // Validation methods
    private void validateOwnershipForCreation(Ownership ownership) {
        // Check if ownership percentage is valid
        if (ownership.getOwnershipPercentage().compareTo(BigDecimal.ZERO) <= 0 ||
            ownership.getOwnershipPercentage().compareTo(new BigDecimal("100.00")) > 0) {
            throw new RuntimeException("Ownership percentage must be between 0.01 and 100.00");
        }

        // Check if adding this ownership would exceed 100%
        if (!canAddOwnership(ownership.getLandParcel().getId(), ownership.getOwnershipPercentage())) {
            throw new RuntimeException("Total ownership percentage would exceed 100%");
        }

        // Check if user already has ownership of this land parcel
        Optional<Ownership> existingOwnership = findActiveOwnershipByUserAndLandParcel(
            ownership.getUser().getId(), ownership.getLandParcel().getId());
        if (existingOwnership.isPresent()) {
            throw new RuntimeException("User already has active ownership of this land parcel");
        }
    }

    private void updateOwnershipFields(Ownership existingOwnership, Ownership ownershipDetails) {
        if (ownershipDetails.getOwnershipPercentage() != null) {
            // Validate new percentage
            BigDecimal currentTotal = getTotalOwnershipPercentageByLandParcel(existingOwnership.getLandParcel().getId());
            BigDecimal newTotal = currentTotal.subtract(existingOwnership.getOwnershipPercentage())
                                             .add(ownershipDetails.getOwnershipPercentage());
            if (newTotal.compareTo(new BigDecimal("100.00")) > 0) {
                throw new RuntimeException("Total ownership percentage would exceed 100%");
            }
            existingOwnership.setOwnershipPercentage(ownershipDetails.getOwnershipPercentage());
        }
        if (ownershipDetails.getOwnershipType() != null) {
            existingOwnership.setOwnershipType(ownershipDetails.getOwnershipType());
        }
        if (ownershipDetails.getTitleDeedNumber() != null) {
            existingOwnership.setTitleDeedNumber(ownershipDetails.getTitleDeedNumber());
        }
        if (ownershipDetails.getStatus() != null) {
            existingOwnership.setStatus(ownershipDetails.getStatus());
        }
        if (ownershipDetails.getEndDate() != null) {
            existingOwnership.setEndDate(ownershipDetails.getEndDate());
        }
        if (ownershipDetails.getNotes() != null) {
            existingOwnership.setNotes(ownershipDetails.getNotes());
        }
    }
}
