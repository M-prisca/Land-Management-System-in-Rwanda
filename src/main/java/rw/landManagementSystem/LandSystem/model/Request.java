package rw.landManagementSystem.LandSystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Request number is required")
    @Size(max = 50, message = "Request number must not exceed 50 characters")
    @Column(name = "request_number", nullable = false, unique = true, length = 50)
    private String requestNumber;

    @NotNull(message = "Requester is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "land_parcel_id")
    private LandParcel landParcel;

    @Enumerated(EnumType.STRING)
    @Column(name = "request_type", nullable = false)
    private RequestType requestType;

    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RequestStatus status = RequestStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private RequestPriority priority = RequestPriority.NORMAL;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @Column(name = "review_date")
    private LocalDateTime reviewDate;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_officer_id")
    private User assignedOfficer;

    @Column(name = "officer_notes", length = 1000)
    private String officerNotes;

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Document> documents;

    // Constructors
    public Request() {}

    public Request(String requestNumber, User requester, RequestType requestType, String description) {
        this.requestNumber = requestNumber;
        this.requester = requester;
        this.requestType = requestType;
        this.description = description;
        this.submissionDate = LocalDateTime.now();
    }

    // Lifecycle methods
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (submissionDate == null) {
            submissionDate = LocalDateTime.now();
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

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public LandParcel getLandParcel() {
        return landParcel;
    }

    public void setLandParcel(LandParcel landParcel) {
        this.landParcel = landParcel;
    }

    public RequestType getRequestType() {
        return requestType;
    }

    public void setRequestType(RequestType requestType) {
        this.requestType = requestType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public RequestPriority getPriority() {
        return priority;
    }

    public void setPriority(RequestPriority priority) {
        this.priority = priority;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public LocalDateTime getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }

    public LocalDateTime getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDateTime completionDate) {
        this.completionDate = completionDate;
    }

    public User getAssignedOfficer() {
        return assignedOfficer;
    }

    public void setAssignedOfficer(User assignedOfficer) {
        this.assignedOfficer = assignedOfficer;
    }

    public String getOfficerNotes() {
        return officerNotes;
    }

    public void setOfficerNotes(String officerNotes) {
        this.officerNotes = officerNotes;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
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

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    // Utility methods
    public boolean isPending() {
        return status == RequestStatus.PENDING;
    }

    public boolean isCompleted() {
        return status == RequestStatus.APPROVED || status == RequestStatus.REJECTED;
    }

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", requestNumber='" + requestNumber + '\'' +
                ", requestType=" + requestType +
                ", status=" + status +
                ", priority=" + priority +
                ", submissionDate=" + submissionDate +
                '}';
    }
}
