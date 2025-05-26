package rw.landManagementSystem.LandSystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ownerships")
public class Ownership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Land parcel is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "land_parcel_id", nullable = false)
    private LandParcel landParcel;

    @NotNull(message = "Ownership percentage is required")
    @DecimalMin(value = "0.01", message = "Ownership percentage must be greater than 0")
    @DecimalMax(value = "100.00", message = "Ownership percentage cannot exceed 100")
    @Column(name = "ownership_percentage", nullable = false, precision = 5, scale = 2)
    private BigDecimal ownershipPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "ownership_type", nullable = false)
    private OwnershipType ownershipType;

    @Column(name = "acquisition_date", nullable = false)
    private LocalDate acquisitionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "acquisition_method", nullable = false)
    private AcquisitionMethod acquisitionMethod;

    @Column(name = "title_deed_number", length = 100)
    private String titleDeedNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OwnershipStatus status = OwnershipStatus.ACTIVE;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "notes", length = 500)
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Ownership() {}

    public Ownership(User user, LandParcel landParcel, BigDecimal ownershipPercentage,
                    OwnershipType ownershipType, LocalDate acquisitionDate,
                    AcquisitionMethod acquisitionMethod) {
        this.user = user;
        this.landParcel = landParcel;
        this.ownershipPercentage = ownershipPercentage;
        this.ownershipType = ownershipType;
        this.acquisitionDate = acquisitionDate;
        this.acquisitionMethod = acquisitionMethod;
        this.startDate = acquisitionDate;
    }

    // Lifecycle methods
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (startDate == null) {
            startDate = acquisitionDate;
        }
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LandParcel getLandParcel() {
        return landParcel;
    }

    public void setLandParcel(LandParcel landParcel) {
        this.landParcel = landParcel;
    }

    public BigDecimal getOwnershipPercentage() {
        return ownershipPercentage;
    }

    public void setOwnershipPercentage(BigDecimal ownershipPercentage) {
        this.ownershipPercentage = ownershipPercentage;
    }

    public OwnershipType getOwnershipType() {
        return ownershipType;
    }

    public void setOwnershipType(OwnershipType ownershipType) {
        this.ownershipType = ownershipType;
    }

    public LocalDate getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public AcquisitionMethod getAcquisitionMethod() {
        return acquisitionMethod;
    }

    public void setAcquisitionMethod(AcquisitionMethod acquisitionMethod) {
        this.acquisitionMethod = acquisitionMethod;
    }

    public String getTitleDeedNumber() {
        return titleDeedNumber;
    }

    public void setTitleDeedNumber(String titleDeedNumber) {
        this.titleDeedNumber = titleDeedNumber;
    }

    public OwnershipStatus getStatus() {
        return status;
    }

    public void setStatus(OwnershipStatus status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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

    // Utility methods
    public boolean isActive() {
        return status == OwnershipStatus.ACTIVE &&
               (endDate == null || endDate.isAfter(LocalDate.now()));
    }

    @Override
    public String toString() {
        return "Ownership{" +
                "id=" + id +
                ", ownershipPercentage=" + ownershipPercentage +
                ", ownershipType=" + ownershipType +
                ", acquisitionDate=" + acquisitionDate +
                ", status=" + status +
                '}';
    }
}
