package rw.landManagementSystem.LandSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.landManagementSystem.LandSystem.model.Request;
import rw.landManagementSystem.LandSystem.model.RequestStatus;
import rw.landManagementSystem.LandSystem.model.RequestType;
import rw.landManagementSystem.LandSystem.model.RequestPriority;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    // Find by unique identifier
    Optional<Request> findByRequestNumber(String requestNumber);

    // Check existence
    boolean existsByRequestNumber(String requestNumber);

    // Find by requester
    List<Request> findByRequesterId(Long requesterId);
    List<Request> findByRequesterIdAndStatus(Long requesterId, RequestStatus status);

    // Find by land parcel
    List<Request> findByLandParcelId(Long landParcelId);
    List<Request> findByLandParcelIdAndStatus(Long landParcelId, RequestStatus status);

    // Find by assigned officer
    List<Request> findByAssignedOfficerId(Long officerId);
    List<Request> findByAssignedOfficerIdAndStatus(Long officerId, RequestStatus status);

    // Find by status
    List<Request> findByStatus(RequestStatus status);
    List<Request> findByStatusOrderBySubmissionDateAsc(RequestStatus status);

    // Find by request type
    List<Request> findByRequestType(RequestType requestType);
    List<Request> findByRequestTypeAndStatus(RequestType requestType, RequestStatus status);

    // Find by priority
    List<Request> findByPriority(RequestPriority priority);
    List<Request> findByPriorityAndStatus(RequestPriority priority, RequestStatus status);

    // Find pending requests
    @Query("SELECT r FROM Request r WHERE r.status = 'PENDING' ORDER BY r.priority DESC, r.submissionDate ASC")
    List<Request> findPendingRequestsOrderedByPriorityAndDate();

    // Find unassigned requests
    @Query("SELECT r FROM Request r WHERE r.assignedOfficer IS NULL AND r.status IN ('PENDING', 'UNDER_REVIEW')")
    List<Request> findUnassignedRequests();

    // Find overdue requests
    @Query("SELECT r FROM Request r WHERE r.status IN ('PENDING', 'UNDER_REVIEW') AND r.submissionDate < :overdueDate")
    List<Request> findOverdueRequests(@Param("overdueDate") LocalDateTime overdueDate);

    // Find requests by date range
    @Query("SELECT r FROM Request r WHERE r.submissionDate BETWEEN :startDate AND :endDate")
    List<Request> findBySubmissionDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT r FROM Request r WHERE r.completionDate BETWEEN :startDate AND :endDate")
    List<Request> findByCompletionDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // Find high priority requests
    @Query("SELECT r FROM Request r WHERE r.priority IN ('HIGH', 'URGENT') AND r.status IN ('PENDING', 'UNDER_REVIEW') ORDER BY r.priority DESC, r.submissionDate ASC")
    List<Request> findHighPriorityPendingRequests();

    // Search requests by description
    @Query("SELECT r FROM Request r WHERE LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Request> findByDescriptionContaining(@Param("keyword") String keyword);

    // Find requests requiring review
    @Query("SELECT r FROM Request r WHERE r.status = 'UNDER_REVIEW' AND r.reviewDate IS NULL")
    List<Request> findRequestsRequiringReview();

    // Find completed requests by officer
    @Query("SELECT r FROM Request r WHERE r.assignedOfficer.id = :officerId AND r.status IN ('APPROVED', 'REJECTED')")
    List<Request> findCompletedRequestsByOfficer(@Param("officerId") Long officerId);

    // Count requests by status
    @Query("SELECT COUNT(r) FROM Request r WHERE r.status = :status")
    long countByStatus(@Param("status") RequestStatus status);

    // Count requests by type
    @Query("SELECT COUNT(r) FROM Request r WHERE r.requestType = :requestType")
    long countByRequestType(@Param("requestType") RequestType requestType);

    // Count pending requests by officer
    @Query("SELECT COUNT(r) FROM Request r WHERE r.assignedOfficer.id = :officerId AND r.status IN ('PENDING', 'UNDER_REVIEW')")
    long countPendingRequestsByOfficer(@Param("officerId") Long officerId);

    // Find requests by requester name
    @Query("SELECT r FROM Request r WHERE " +
           "LOWER(CONCAT(r.requester.firstName, ' ', r.requester.lastName)) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Request> findByRequesterNameContaining(@Param("name") String name);

    // Find recent requests
    @Query("SELECT r FROM Request r WHERE r.submissionDate >= :date ORDER BY r.submissionDate DESC")
    List<Request> findRecentRequests(@Param("date") LocalDateTime date);

    // Calculate average processing time - temporarily disabled due to query complexity
    // @Query("SELECT AVG(EXTRACT(DAY FROM (r.completionDate - r.submissionDate))) FROM Request r WHERE r.completionDate IS NOT NULL")
    // Double getAverageProcessingTimeInDays();
}
