package rw.landManagementSystem.LandSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.model.Ownership;
import rw.landManagementSystem.LandSystem.model.OwnershipStatus;
import rw.landManagementSystem.LandSystem.model.OwnershipType;
import rw.landManagementSystem.LandSystem.model.AcquisitionMethod;
import rw.landManagementSystem.LandSystem.service.OwnershipService;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ownerships")
@CrossOrigin(origins = "*")
public class OwnershipController {

    private final OwnershipService ownershipService;

    public OwnershipController(OwnershipService ownershipService) {
        this.ownershipService = ownershipService;
    }

    // Create ownership
    @PostMapping
    public ResponseEntity<Ownership> createOwnership(@Valid @RequestBody Ownership ownership) {
        try {
            Ownership createdOwnership = ownershipService.createOwnership(ownership);
            return new ResponseEntity<>(createdOwnership, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all ownerships
    @GetMapping
    public ResponseEntity<List<Ownership>> getAllOwnerships() {
        List<Ownership> ownerships = ownershipService.getAllOwnerships();
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get ownership by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ownership> getOwnershipById(@PathVariable Long id) {
        try {
            Ownership ownership = ownershipService.getOwnershipById(id);
            return new ResponseEntity<>(ownership, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Update ownership
    @PutMapping("/{id}")
    public ResponseEntity<Ownership> updateOwnership(@PathVariable Long id, @Valid @RequestBody Ownership ownershipDetails) {
        try {
            Ownership updatedOwnership = ownershipService.updateOwnership(id, ownershipDetails);
            return new ResponseEntity<>(updatedOwnership, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete ownership
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwnership(@PathVariable Long id) {
        try {
            ownershipService.deleteOwnership(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get ownerships by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ownership>> getOwnershipsByUser(@PathVariable Long userId) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByUser(userId);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get active ownerships by user
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<Ownership>> getActiveOwnershipsByUser(@PathVariable Long userId) {
        List<Ownership> ownerships = ownershipService.getActiveOwnershipsByUser(userId);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get ownerships by land parcel
    @GetMapping("/land-parcel/{landParcelId}")
    public ResponseEntity<List<Ownership>> getOwnershipsByLandParcel(@PathVariable Long landParcelId) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByLandParcel(landParcelId);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get active ownerships by land parcel
    @GetMapping("/land-parcel/{landParcelId}/active")
    public ResponseEntity<List<Ownership>> getActiveOwnershipsByLandParcel(@PathVariable Long landParcelId) {
        List<Ownership> ownerships = ownershipService.getActiveOwnershipsByLandParcel(landParcelId);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Find ownership by user and land parcel
    @GetMapping("/user/{userId}/land-parcel/{landParcelId}")
    public ResponseEntity<Ownership> findOwnershipByUserAndLandParcel(@PathVariable Long userId, @PathVariable Long landParcelId) {
        Optional<Ownership> ownership = ownershipService.findOwnershipByUserAndLandParcel(userId, landParcelId);
        return ownership.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                       .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Find active ownership by user and land parcel
    @GetMapping("/user/{userId}/land-parcel/{landParcelId}/active")
    public ResponseEntity<Ownership> findActiveOwnershipByUserAndLandParcel(@PathVariable Long userId, @PathVariable Long landParcelId) {
        Optional<Ownership> ownership = ownershipService.findActiveOwnershipByUserAndLandParcel(userId, landParcelId);
        return ownership.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                       .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get all active ownerships
    @GetMapping("/active")
    public ResponseEntity<List<Ownership>> getAllActiveOwnerships() {
        List<Ownership> ownerships = ownershipService.getAllActiveOwnerships();
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get ownerships by type
    @GetMapping("/type/{ownershipType}")
    public ResponseEntity<List<Ownership>> getOwnershipsByType(@PathVariable OwnershipType ownershipType) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByType(ownershipType);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get ownerships by acquisition method
    @GetMapping("/acquisition-method/{acquisitionMethod}")
    public ResponseEntity<List<Ownership>> getOwnershipsByAcquisitionMethod(@PathVariable AcquisitionMethod acquisitionMethod) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByAcquisitionMethod(acquisitionMethod);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Find ownership by title deed number
    @GetMapping("/title-deed/{titleDeedNumber}")
    public ResponseEntity<Ownership> findOwnershipByTitleDeedNumber(@PathVariable String titleDeedNumber) {
        Optional<Ownership> ownership = ownershipService.findOwnershipByTitleDeedNumber(titleDeedNumber);
        return ownership.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                       .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get ownerships by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Ownership>> getOwnershipsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByDateRange(startDate, endDate);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get ownerships by percentage range
    @GetMapping("/percentage-range")
    public ResponseEntity<List<Ownership>> getOwnershipsByPercentageRange(
            @RequestParam BigDecimal minPercentage,
            @RequestParam BigDecimal maxPercentage) {
        List<Ownership> ownerships = ownershipService.getOwnershipsByPercentageRange(minPercentage, maxPercentage);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get full ownerships
    @GetMapping("/full")
    public ResponseEntity<List<Ownership>> getFullOwnerships() {
        List<Ownership> ownerships = ownershipService.getFullOwnerships();
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get partial ownerships
    @GetMapping("/partial")
    public ResponseEntity<List<Ownership>> getPartialOwnerships() {
        List<Ownership> ownerships = ownershipService.getPartialOwnerships();
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get disputed ownerships
    @GetMapping("/disputed")
    public ResponseEntity<List<Ownership>> getDisputedOwnerships() {
        List<Ownership> ownerships = ownershipService.getDisputedOwnerships();
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get expiring ownerships
    @GetMapping("/expiring")
    public ResponseEntity<List<Ownership>> getExpiringOwnerships(@RequestParam LocalDate date) {
        List<Ownership> ownerships = ownershipService.getExpiringOwnerships(date);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Get recent transfers
    @GetMapping("/recent-transfers")
    public ResponseEntity<List<Ownership>> getRecentTransfers(@RequestParam LocalDate date) {
        List<Ownership> ownerships = ownershipService.getRecentTransfers(date);
        return new ResponseEntity<>(ownerships, HttpStatus.OK);
    }

    // Status management endpoints
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateOwnershipStatus(@PathVariable Long id, @RequestParam OwnershipStatus status) {
        try {
            ownershipService.updateOwnershipStatus(id, status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateOwnership(@PathVariable Long id) {
        try {
            ownershipService.activateOwnership(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateOwnership(@PathVariable Long id) {
        try {
            ownershipService.deactivateOwnership(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/transfer")
    public ResponseEntity<Void> transferOwnership(@PathVariable Long id) {
        try {
            ownershipService.transferOwnership(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/dispute")
    public ResponseEntity<Void> disputeOwnership(@PathVariable Long id) {
        try {
            ownershipService.disputeOwnership(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/suspend")
    public ResponseEntity<Void> suspendOwnership(@PathVariable Long id) {
        try {
            ownershipService.suspendOwnership(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Business logic endpoints
    @GetMapping("/land-parcel/{landParcelId}/total-percentage")
    public ResponseEntity<BigDecimal> getTotalOwnershipPercentageByLandParcel(@PathVariable Long landParcelId) {
        BigDecimal totalPercentage = ownershipService.getTotalOwnershipPercentageByLandParcel(landParcelId);
        return new ResponseEntity<>(totalPercentage, HttpStatus.OK);
    }

    @GetMapping("/land-parcel/{landParcelId}/has-multiple-owners")
    public ResponseEntity<Boolean> hasMultipleOwners(@PathVariable Long landParcelId) {
        boolean hasMultiple = ownershipService.hasMultipleOwners(landParcelId);
        return new ResponseEntity<>(hasMultiple, HttpStatus.OK);
    }

    @GetMapping("/land-parcel/{landParcelId}/can-add-ownership")
    public ResponseEntity<Boolean> canAddOwnership(@PathVariable Long landParcelId, @RequestParam BigDecimal ownershipPercentage) {
        boolean canAdd = ownershipService.canAddOwnership(landParcelId, ownershipPercentage);
        return new ResponseEntity<>(canAdd, HttpStatus.OK);
    }

    // Statistics endpoints
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalOwnershipCount() {
        long count = ownershipService.getTotalOwnershipCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/user/{userId}/active")
    public ResponseEntity<Long> getActiveOwnershipCountByUser(@PathVariable Long userId) {
        long count = ownershipService.getActiveOwnershipCountByUser(userId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/status/{status}")
    public ResponseEntity<Long> getOwnershipCountByStatus(@PathVariable OwnershipStatus status) {
        long count = ownershipService.getOwnershipCountByStatus(status);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
