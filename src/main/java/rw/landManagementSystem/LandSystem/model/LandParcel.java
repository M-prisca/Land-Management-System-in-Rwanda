package rw.landManagementSystem.LandSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "land_parcels")
public class LandParcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Parcel number is required")
    @Size(max = 50, message = "Parcel number must not exceed 50 characters")
    @Column(name = "parcel_number", nullable = false, unique = true, length = 50)
    private String parcelNumber;

    @NotBlank(message = "Location is required")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @NotBlank(message = "District is required")
    @Size(max = 100, message = "District must not exceed 100 characters")
    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @NotBlank(message = "Sector is required")
    @Size(max = 100, message = "Sector must not exceed 100 characters")
    @Column(name = "sector", nullable = false, length = 100)
    private String sector;

    @NotBlank(message = "Cell is required")
    @Size(max = 100, message = "Cell must not exceed 100 characters")
    @Column(name = "cell", nullable = false, length = 100)
    private String cell;

    @NotNull(message = "Area is required")
    @DecimalMin(value = "0.01", message = "Area must be greater than 0")
    @Column(name = "area_sqm", nullable = false, precision = 15, scale = 2)
    private BigDecimal areaSqm;

    @Enumerated(EnumType.STRING)
    @Column(name = "land_use", nullable = false)
    private LandUse landUse;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LandStatus status = LandStatus.AVAILABLE;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "coordinates", length = 255)
    private String coordinates;

    @Column(name = "market_value", precision = 15, scale = 2)
    private BigDecimal marketValue;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @JsonIgnore
    @OneToMany(mappedBy = "landParcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ownership> ownerships;

    @JsonIgnore
    @OneToMany(mappedBy = "landParcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Request> requests;

    @JsonIgnore
    @OneToMany(mappedBy = "landParcel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Document> documents;

    // Constructors
    public LandParcel() {}

    public LandParcel(String parcelNumber, String location, String district, String sector,
                     String cell, BigDecimal areaSqm, LandUse landUse) {
        this.parcelNumber = parcelNumber;
        this.location = location;
        this.district = district;
        this.sector = sector;
        this.cell = cell;
        this.areaSqm = areaSqm;
        this.landUse = landUse;
    }

    // Lifecycle methods
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParcelNumber() {
        return parcelNumber;
    }

    public void setParcelNumber(String parcelNumber) {
        this.parcelNumber = parcelNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getCell() {
        return cell;
    }

    public void setCell(String cell) {
        this.cell = cell;
    }

    public BigDecimal getAreaSqm() {
        return areaSqm;
    }

    public void setAreaSqm(BigDecimal areaSqm) {
        this.areaSqm = areaSqm;
    }

    public LandUse getLandUse() {
        return landUse;
    }

    public void setLandUse(LandUse landUse) {
        this.landUse = landUse;
    }

    public LandStatus getStatus() {
        return status;
    }

    public void setStatus(LandStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public BigDecimal getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(BigDecimal marketValue) {
        this.marketValue = marketValue;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Ownership> getOwnerships() {
        return ownerships;
    }

    public void setOwnerships(List<Ownership> ownerships) {
        this.ownerships = ownerships;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    // Utility methods
    public String getFullAddress() {
        return location + ", " + cell + ", " + sector + ", " + district;
    }

    @Override
    public String toString() {
        return "LandParcel{" +
                "id=" + id +
                ", parcelNumber='" + parcelNumber + '\'' +
                ", location='" + location + '\'' +
                ", district='" + district + '\'' +
                ", areaSqm=" + areaSqm +
                ", landUse=" + landUse +
                ", status=" + status +
                '}';
    }
}
