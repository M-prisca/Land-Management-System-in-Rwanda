package rw.landManagementSystem.LandSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.model.Request;
import rw.landManagementSystem.LandSystem.model.RequestStatus;
import rw.landManagementSystem.LandSystem.model.RequestType;
import rw.landManagementSystem.LandSystem.model.RequestPriority;
import rw.landManagementSystem.LandSystem.service.RequestService;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // Create request
    @PostMapping
    public ResponseEntity<Request> createRequest(@Valid @RequestBody Request request) {
        try {
            Request createdRequest = requestService.createRequest(request);
            return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        try {
            Request request = requestService.getRequestById(id);
            return new ResponseEntity<>(request, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Update request
    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @Valid @RequestBody Request requestDetails) {
        try {
            Request updatedRequest = requestService.updateRequest(id, requestDetails);
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        try {
            requestService.deleteRequest(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get request by request number
    @GetMapping("/request-number/{requestNumber}")
    public ResponseEntity<Request> getRequestByRequestNumber(@PathVariable String requestNumber) {
        Optional<Request> request = requestService.findRequestByRequestNumber(requestNumber);
        return request.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                     .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Get requests by requester
    @GetMapping("/requester/{requesterId}")
    public ResponseEntity<List<Request>> getRequestsByRequester(@PathVariable Long requesterId) {
        List<Request> requests = requestService.getRequestsByRequester(requesterId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by requester and status
    @GetMapping("/requester/{requesterId}/status/{status}")
    public ResponseEntity<List<Request>> getRequestsByRequesterAndStatus(@PathVariable Long requesterId, @PathVariable RequestStatus status) {
        List<Request> requests = requestService.getRequestsByRequesterAndStatus(requesterId, status);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by land parcel
    @GetMapping("/land-parcel/{landParcelId}")
    public ResponseEntity<List<Request>> getRequestsByLandParcel(@PathVariable Long landParcelId) {
        List<Request> requests = requestService.getRequestsByLandParcel(landParcelId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by assigned officer
    @GetMapping("/officer/{officerId}")
    public ResponseEntity<List<Request>> getRequestsByAssignedOfficer(@PathVariable Long officerId) {
        List<Request> requests = requestService.getRequestsByAssignedOfficer(officerId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Request>> getRequestsByStatus(@PathVariable RequestStatus status) {
        List<Request> requests = requestService.getRequestsByStatus(status);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by type
    @GetMapping("/type/{requestType}")
    public ResponseEntity<List<Request>> getRequestsByType(@PathVariable RequestType requestType) {
        List<Request> requests = requestService.getRequestsByType(requestType);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by priority
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Request>> getRequestsByPriority(@PathVariable RequestPriority priority) {
        List<Request> requests = requestService.getRequestsByPriority(priority);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get pending requests ordered by priority
    @GetMapping("/pending/ordered")
    public ResponseEntity<List<Request>> getPendingRequestsOrderedByPriority() {
        List<Request> requests = requestService.getPendingRequestsOrderedByPriority();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get unassigned requests
    @GetMapping("/unassigned")
    public ResponseEntity<List<Request>> getUnassignedRequests() {
        List<Request> requests = requestService.getUnassignedRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get overdue requests
    @GetMapping("/overdue")
    public ResponseEntity<List<Request>> getOverdueRequests(@RequestParam(defaultValue = "30") int daysOverdue) {
        List<Request> requests = requestService.getOverdueRequests(daysOverdue);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get high priority pending requests
    @GetMapping("/high-priority/pending")
    public ResponseEntity<List<Request>> getHighPriorityPendingRequests() {
        List<Request> requests = requestService.getHighPriorityPendingRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests requiring review
    @GetMapping("/requiring-review")
    public ResponseEntity<List<Request>> getRequestsRequiringReview() {
        List<Request> requests = requestService.getRequestsRequiringReview();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get completed requests by officer
    @GetMapping("/officer/{officerId}/completed")
    public ResponseEntity<List<Request>> getCompletedRequestsByOfficer(@PathVariable Long officerId) {
        List<Request> requests = requestService.getCompletedRequestsByOfficer(officerId);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Search requests by description
    @GetMapping("/search/description")
    public ResponseEntity<List<Request>> searchRequestsByDescription(@RequestParam String keyword) {
        List<Request> requests = requestService.searchRequestsByDescription(keyword);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Search requests by requester name
    @GetMapping("/search/requester")
    public ResponseEntity<List<Request>> searchRequestsByRequesterName(@RequestParam String name) {
        List<Request> requests = requestService.searchRequestsByRequesterName(name);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get recent requests
    @GetMapping("/recent")
    public ResponseEntity<List<Request>> getRecentRequests(@RequestParam(defaultValue = "7") int days) {
        List<Request> requests = requestService.getRecentRequests(days);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Get requests by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Request>> getRequestsByDateRange(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        List<Request> requests = requestService.getRequestsByDateRange(startDate, endDate);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Status management endpoints
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRequestStatus(@PathVariable Long id, @RequestParam RequestStatus status) {
        try {
            requestService.updateRequestStatus(id, status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Void> approveRequest(@PathVariable Long id) {
        try {
            requestService.approveRequest(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long id, @RequestParam String rejectionReason) {
        try {
            requestService.rejectRequest(id, rejectionReason);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/hold")
    public ResponseEntity<Void> putRequestOnHold(@PathVariable Long id) {
        try {
            requestService.putRequestOnHold(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelRequest(@PathVariable Long id) {
        try {
            requestService.cancelRequest(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/start-review")
    public ResponseEntity<Void> startReview(@PathVariable Long id) {
        try {
            requestService.startReview(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Assignment management endpoints
    @PatchMapping("/{requestId}/assign/{officerId}")
    public ResponseEntity<Void> assignRequestToOfficer(@PathVariable Long requestId, @PathVariable Long officerId) {
        try {
            requestService.assignRequestToOfficer(requestId, officerId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{requestId}/unassign")
    public ResponseEntity<Void> unassignRequest(@PathVariable Long requestId) {
        try {
            requestService.unassignRequest(requestId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{requestId}/notes")
    public ResponseEntity<Void> addOfficerNotes(@PathVariable Long requestId, @RequestParam String notes) {
        try {
            requestService.addOfficerNotes(requestId, notes);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Priority management
    @PatchMapping("/{id}/priority")
    public ResponseEntity<Void> updateRequestPriority(@PathVariable Long id, @RequestParam RequestPriority priority) {
        try {
            requestService.updateRequestPriority(id, priority);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Statistics endpoints
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalRequestCount() {
        long count = requestService.getTotalRequestCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/status/{status}")
    public ResponseEntity<Long> getRequestCountByStatus(@PathVariable RequestStatus status) {
        long count = requestService.getRequestCountByStatus(status);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/type/{requestType}")
    public ResponseEntity<Long> getRequestCountByType(@PathVariable RequestType requestType) {
        long count = requestService.getRequestCountByType(requestType);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/officer/{officerId}/pending")
    public ResponseEntity<Long> getPendingRequestCountByOfficer(@PathVariable Long officerId) {
        long count = requestService.getPendingRequestCountByOfficer(officerId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Temporarily disabled due to query complexity
    // @GetMapping("/stats/average-processing-time")
    // public ResponseEntity<Double> getAverageProcessingTimeInDays() {
    //     Double averageTime = requestService.getAverageProcessingTimeInDays();
    //     return new ResponseEntity<>(averageTime, HttpStatus.OK);
    // }

    // Validation endpoints
    @GetMapping("/validate/request-number/{requestNumber}")
    public ResponseEntity<Boolean> isRequestNumberAvailable(@PathVariable String requestNumber) {
        boolean available = requestService.isRequestNumberAvailable(requestNumber);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }
}
