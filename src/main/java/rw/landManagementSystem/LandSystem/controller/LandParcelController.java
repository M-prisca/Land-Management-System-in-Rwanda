package rw.landManagementSystem.LandSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.model.LandParcel;
import rw.landManagementSystem.LandSystem.model.LandStatus;
import rw.landManagementSystem.LandSystem.model.LandUse;
import rw.landManagementSystem.LandSystem.service.LandParcelService;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/land-parcels")
@CrossOrigin(origins = "*")
public class LandParcelController {

    private final LandParcelService landParcelService;

    public LandParcelController(LandParcelService landParcelService) {
        this.landParcelService = landParcelService;
    }

    // Create land parcel
    @PostMapping
    public ResponseEntity<LandParcel> createLandParcel(@Valid @RequestBody LandParcel landParcel) {
        try {
            LandParcel createdLandParcel = landParcelService.createLandParcel(landParcel);
            return new ResponseEntity<>(createdLandParcel, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all land parcels
    @GetMapping
    public ResponseEntity<List<LandParcel>> getAllLandParcels() {
        List<LandParcel> landParcels = landParcelService.getAllLandParcels();
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcel by ID
    @GetMapping("/{id}")
    public ResponseEntity<LandParcel> getLandParcelById(@PathVariable Long id) {
        try {
            LandParcel landParcel = landParcelService.getLandParcelById(id);
            return new ResponseEntity<>(landParcel, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Update land parcel
    @PutMapping("/{id}")
    public ResponseEntity<LandParcel> updateLandParcel(@PathVariable Long id, @Valid @RequestBody LandParcel landParcelDetails) {
        try {
            LandParcel updatedLandParcel = landParcelService.updateLandParcel(id, landParcelDetails);
            return new ResponseEntity<>(updatedLandParcel, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete land parcel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandParcel(@PathVariable Long id) {
        try {
            landParcelService.deleteLandParcel(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get land parcel by parcel number
    @GetMapping("/parcel-number/{parcelNumber}")
    public ResponseEntity<LandParcel> getLandParcelByParcelNumber(@PathVariable String parcelNumber) {
        Optional<LandParcel> landParcel = landParcelService.findLandParcelByParcelNumber(parcelNumber);
        return landParcel.map(lp -> new ResponseEntity<>(lp, HttpStatus.OK))
                        .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get land parcels by location
    @GetMapping("/district/{district}")
    public ResponseEntity<List<LandParcel>> getLandParcelsByDistrict(@PathVariable String district) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByDistrict(district);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    @GetMapping("/sector/{sector}")
    public ResponseEntity<List<LandParcel>> getLandParcelsBySector(@PathVariable String sector) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsBySector(sector);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    @GetMapping("/cell/{cell}")
    public ResponseEntity<List<LandParcel>> getLandParcelsByCell(@PathVariable String cell) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByCell(cell);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    @GetMapping("/location")
    public ResponseEntity<List<LandParcel>> getLandParcelsByLocation(
            @RequestParam String district,
            @RequestParam String sector,
            @RequestParam String cell) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByLocation(district, sector, cell);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<LandParcel>> getLandParcelsByStatus(@PathVariable LandStatus status) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByStatus(status);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels by land use
    @GetMapping("/land-use/{landUse}")
    public ResponseEntity<List<LandParcel>> getLandParcelsByLandUse(@PathVariable LandUse landUse) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByLandUse(landUse);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get available land parcels
    @GetMapping("/available")
    public ResponseEntity<List<LandParcel>> getAvailableLandParcels() {
        List<LandParcel> landParcels = landParcelService.getAvailableLandParcels();
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels by area range
    @GetMapping("/area-range")
    public ResponseEntity<List<LandParcel>> getLandParcelsByAreaRange(
            @RequestParam BigDecimal minArea,
            @RequestParam BigDecimal maxArea) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByAreaRange(minArea, maxArea);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels by market value range
    @GetMapping("/value-range")
    public ResponseEntity<List<LandParcel>> getLandParcelsByMarketValueRange(
            @RequestParam BigDecimal minValue,
            @RequestParam BigDecimal maxValue) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByMarketValueRange(minValue, maxValue);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Search land parcels by location
    @GetMapping("/search")
    public ResponseEntity<List<LandParcel>> searchLandParcelsByLocation(@RequestParam String location) {
        List<LandParcel> landParcels = landParcelService.searchLandParcelsByLocation(location);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels with active ownership
    @GetMapping("/with-ownership")
    public ResponseEntity<List<LandParcel>> getLandParcelsWithActiveOwnership() {
        List<LandParcel> landParcels = landParcelService.getLandParcelsWithActiveOwnership();
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels without ownership
    @GetMapping("/without-ownership")
    public ResponseEntity<List<LandParcel>> getLandParcelsWithoutOwnership() {
        List<LandParcel> landParcels = landParcelService.getLandParcelsWithoutOwnership();
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Get land parcels by owner
    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<LandParcel>> getLandParcelsByOwner(@PathVariable Long userId) {
        List<LandParcel> landParcels = landParcelService.getLandParcelsByOwner(userId);
        return new ResponseEntity<>(landParcels, HttpStatus.OK);
    }

    // Status management endpoints
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateLandParcelStatus(@PathVariable Long id, @RequestParam LandStatus status) {
        try {
            landParcelService.updateLandParcelStatus(id, status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-occupied")
    public ResponseEntity<Void> markAsOccupied(@PathVariable Long id) {
        try {
            landParcelService.markAsOccupied(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-available")
    public ResponseEntity<Void> markAsAvailable(@PathVariable Long id) {
        try {
            landParcelService.markAsAvailable(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-disputed")
    public ResponseEntity<Void> markAsDisputed(@PathVariable Long id) {
        try {
            landParcelService.markAsDisputed(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-reserved")
    public ResponseEntity<Void> markAsReserved(@PathVariable Long id) {
        try {
            landParcelService.markAsReserved(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-under-transfer")
    public ResponseEntity<Void> markAsUnderTransfer(@PathVariable Long id) {
        try {
            landParcelService.markAsUnderTransfer(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Statistics endpoints
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalLandParcelCount() {
        long count = landParcelService.getTotalLandParcelCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/status/{status}")
    public ResponseEntity<Long> getLandParcelCountByStatus(@PathVariable LandStatus status) {
        long count = landParcelService.getLandParcelCountByStatus(status);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/land-use/{landUse}")
    public ResponseEntity<Long> getLandParcelCountByLandUse(@PathVariable LandUse landUse) {
        long count = landParcelService.getLandParcelCountByLandUse(landUse);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/total-area/{district}")
    public ResponseEntity<BigDecimal> getTotalAreaByDistrict(@PathVariable String district) {
        BigDecimal totalArea = landParcelService.getTotalAreaByDistrict(district);
        return new ResponseEntity<>(totalArea, HttpStatus.OK);
    }

    @GetMapping("/stats/total-market-value")
    public ResponseEntity<BigDecimal> getTotalMarketValue() {
        BigDecimal totalValue = landParcelService.getTotalMarketValue();
        return new ResponseEntity<>(totalValue, HttpStatus.OK);
    }

    // Validation endpoints
    @GetMapping("/validate/parcel-number/{parcelNumber}")
    public ResponseEntity<Boolean> isParcelNumberAvailable(@PathVariable String parcelNumber) {
        boolean available = landParcelService.isParcelNumberAvailable(parcelNumber);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }
}
