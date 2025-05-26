package rw.landManagementSystem.LandSystem.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.landManagementSystem.LandSystem.model.Request;
import rw.landManagementSystem.LandSystem.model.RequestStatus;
import rw.landManagementSystem.LandSystem.model.RequestType;
import rw.landManagementSystem.LandSystem.model.RequestPriority;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.repository.RequestRepository;
import rw.landManagementSystem.LandSystem.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("unused") // UserService is used in assignRequestToOfficer method
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserService userService;

    public RequestService(RequestRepository requestRepository, UserService userService) {
        this.requestRepository = requestRepository;
        this.userService = userService;
    }

    // Create and Update operations
    public Request createRequest(Request request) {
        validateRequestForCreation(request);
        generateRequestNumber(request);
        return requestRepository.save(request);
    }

    public Request updateRequest(Long id, Request requestDetails) {
        Request existingRequest = getRequestById(id);
        updateRequestFields(existingRequest, requestDetails);
        return requestRepository.save(existingRequest);
    }

    // Read operations
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));
    }

    public Optional<Request> findRequestByRequestNumber(String requestNumber) {
        return requestRepository.findByRequestNumber(requestNumber);
    }

    public List<Request> getRequestsByRequester(Long requesterId) {
        return requestRepository.findByRequesterId(requesterId);
    }

    public List<Request> getRequestsByRequesterAndStatus(Long requesterId, RequestStatus status) {
        return requestRepository.findByRequesterIdAndStatus(requesterId, status);
    }

    public List<Request> getRequestsByLandParcel(Long landParcelId) {
        return requestRepository.findByLandParcelId(landParcelId);
    }

    public List<Request> getRequestsByAssignedOfficer(Long officerId) {
        return requestRepository.findByAssignedOfficerId(officerId);
    }

    public List<Request> getRequestsByStatus(RequestStatus status) {
        return requestRepository.findByStatus(status);
    }

    public List<Request> getRequestsByType(RequestType requestType) {
        return requestRepository.findByRequestType(requestType);
    }

    public List<Request> getRequestsByPriority(RequestPriority priority) {
        return requestRepository.findByPriority(priority);
    }

    public List<Request> getPendingRequestsOrderedByPriority() {
        return requestRepository.findPendingRequestsOrderedByPriorityAndDate();
    }

    public List<Request> getUnassignedRequests() {
        return requestRepository.findUnassignedRequests();
    }

    public List<Request> getOverdueRequests(int daysOverdue) {
        LocalDateTime overdueDate = LocalDateTime.now().minusDays(daysOverdue);
        return requestRepository.findOverdueRequests(overdueDate);
    }

    public List<Request> getHighPriorityPendingRequests() {
        return requestRepository.findHighPriorityPendingRequests();
    }

    public List<Request> getRequestsRequiringReview() {
        return requestRepository.findRequestsRequiringReview();
    }

    public List<Request> getCompletedRequestsByOfficer(Long officerId) {
        return requestRepository.findCompletedRequestsByOfficer(officerId);
    }

    public List<Request> searchRequestsByDescription(String keyword) {
        return requestRepository.findByDescriptionContaining(keyword);
    }

    public List<Request> searchRequestsByRequesterName(String name) {
        return requestRepository.findByRequesterNameContaining(name);
    }

    public List<Request> getRecentRequests(int days) {
        LocalDateTime date = LocalDateTime.now().minusDays(days);
        return requestRepository.findRecentRequests(date);
    }

    public List<Request> getRequestsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return requestRepository.findBySubmissionDateBetween(startDate, endDate);
    }

    // Delete operations
    public void deleteRequest(Long id) {
        Request request = getRequestById(id);
        requestRepository.delete(request);
    }

    // Status management
    public void updateRequestStatus(Long id, RequestStatus status) {
        Request request = getRequestById(id);
        request.setStatus(status);

        if (status == RequestStatus.UNDER_REVIEW && request.getReviewDate() == null) {
            request.setReviewDate(LocalDateTime.now());
        }
        if (status == RequestStatus.APPROVED || status == RequestStatus.REJECTED) {
            request.setCompletionDate(LocalDateTime.now());
        }

        requestRepository.save(request);
    }

    public void approveRequest(Long id) {
        updateRequestStatus(id, RequestStatus.APPROVED);
    }

    public void rejectRequest(Long id, String rejectionReason) {
        Request request = getRequestById(id);
        request.setStatus(RequestStatus.REJECTED);
        request.setRejectionReason(rejectionReason);
        request.setCompletionDate(LocalDateTime.now());
        requestRepository.save(request);
    }

    public void putRequestOnHold(Long id) {
        updateRequestStatus(id, RequestStatus.ON_HOLD);
    }

    public void cancelRequest(Long id) {
        updateRequestStatus(id, RequestStatus.CANCELLED);
    }

    public void startReview(Long id) {
        updateRequestStatus(id, RequestStatus.UNDER_REVIEW);
    }

    // Assignment management
    public void assignRequestToOfficer(Long requestId, Long officerId) {
        Request request = getRequestById(requestId);
        User officer = userService.getUserById(officerId);
        request.setAssignedOfficer(officer);
        requestRepository.save(request);
    }

    public void unassignRequest(Long requestId) {
        Request request = getRequestById(requestId);
        request.setAssignedOfficer(null);
        requestRepository.save(request);
    }

    public void addOfficerNotes(Long requestId, String notes) {
        Request request = getRequestById(requestId);
        request.setOfficerNotes(notes);
        requestRepository.save(request);
    }

    // Priority management
    public void updateRequestPriority(Long id, RequestPriority priority) {
        Request request = getRequestById(id);
        request.setPriority(priority);
        requestRepository.save(request);
    }

    // Statistics and counts
    public long getTotalRequestCount() {
        return requestRepository.count();
    }

    public long getRequestCountByStatus(RequestStatus status) {
        return requestRepository.countByStatus(status);
    }

    public long getRequestCountByType(RequestType requestType) {
        return requestRepository.countByRequestType(requestType);
    }

    public long getPendingRequestCountByOfficer(Long officerId) {
        return requestRepository.countPendingRequestsByOfficer(officerId);
    }

    // Temporarily disabled due to query complexity
    // public Double getAverageProcessingTimeInDays() {
    //     return requestRepository.getAverageProcessingTimeInDays();
    // }

    // Validation methods
    public boolean isRequestNumberAvailable(String requestNumber) {
        return !requestRepository.existsByRequestNumber(requestNumber);
    }

    // Private helper methods
    private void validateRequestForCreation(Request request) {
        if (request.getRequestNumber() != null && !isRequestNumberAvailable(request.getRequestNumber())) {
            throw new RuntimeException("Request number already exists: " + request.getRequestNumber());
        }
    }

    private void generateRequestNumber(Request request) {
        if (request.getRequestNumber() == null || request.getRequestNumber().isEmpty()) {
            String prefix = "REQ";
            String year = String.valueOf(LocalDateTime.now().getYear());
            long count = requestRepository.count() + 1;
            String requestNumber = String.format("%s-%s-%06d", prefix, year, count);
            request.setRequestNumber(requestNumber);
        }
    }

    private void updateRequestFields(Request existingRequest, Request requestDetails) {
        if (requestDetails.getDescription() != null) {
            existingRequest.setDescription(requestDetails.getDescription());
        }
        if (requestDetails.getStatus() != null) {
            existingRequest.setStatus(requestDetails.getStatus());
        }
        if (requestDetails.getPriority() != null) {
            existingRequest.setPriority(requestDetails.getPriority());
        }
        if (requestDetails.getAssignedOfficer() != null) {
            existingRequest.setAssignedOfficer(requestDetails.getAssignedOfficer());
        }
        if (requestDetails.getOfficerNotes() != null) {
            existingRequest.setOfficerNotes(requestDetails.getOfficerNotes());
        }
        if (requestDetails.getRejectionReason() != null) {
            existingRequest.setRejectionReason(requestDetails.getRejectionReason());
        }
    }
}
