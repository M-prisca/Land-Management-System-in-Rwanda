package rw.landManagementSystem.LandSystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.landManagementSystem.LandSystem.model.Document;
import rw.landManagementSystem.LandSystem.model.DocumentStatus;
import rw.landManagementSystem.LandSystem.model.DocumentType;
import rw.landManagementSystem.LandSystem.service.DocumentService;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // Create document
    @PostMapping
    public ResponseEntity<Document> createDocument(@Valid @RequestBody Document document) {
        try {
            Document createdDocument = documentService.createDocument(document);
            return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all documents
    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get document by ID
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
        try {
            Document document = documentService.getDocumentById(id);
            return new ResponseEntity<>(document, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Update document
    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable Long id, @Valid @RequestBody Document documentDetails) {
        try {
            Document updatedDocument = documentService.updateDocument(id, documentDetails);
            return new ResponseEntity<>(updatedDocument, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete document
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get documents by land parcel
    @GetMapping("/land-parcel/{landParcelId}")
    public ResponseEntity<List<Document>> getDocumentsByLandParcel(@PathVariable Long landParcelId) {
        List<Document> documents = documentService.getDocumentsByLandParcel(landParcelId);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by land parcel and status
    @GetMapping("/land-parcel/{landParcelId}/status/{status}")
    public ResponseEntity<List<Document>> getDocumentsByLandParcelAndStatus(@PathVariable Long landParcelId, @PathVariable DocumentStatus status) {
        List<Document> documents = documentService.getDocumentsByLandParcelAndStatus(landParcelId, status);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by land parcel and type
    @GetMapping("/land-parcel/{landParcelId}/type/{documentType}")
    public ResponseEntity<List<Document>> getDocumentsByLandParcelAndType(@PathVariable Long landParcelId, @PathVariable DocumentType documentType) {
        List<Document> documents = documentService.getDocumentsByLandParcelAndType(landParcelId, documentType);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by request
    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<Document>> getDocumentsByRequest(@PathVariable Long requestId) {
        List<Document> documents = documentService.getDocumentsByRequest(requestId);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by uploader
    @GetMapping("/uploader/{uploaderId}")
    public ResponseEntity<List<Document>> getDocumentsByUploader(@PathVariable Long uploaderId) {
        List<Document> documents = documentService.getDocumentsByUploader(uploaderId);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by type
    @GetMapping("/type/{documentType}")
    public ResponseEntity<List<Document>> getDocumentsByType(@PathVariable DocumentType documentType) {
        List<Document> documents = documentService.getDocumentsByType(documentType);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Document>> getDocumentsByStatus(@PathVariable DocumentStatus status) {
        List<Document> documents = documentService.getDocumentsByStatus(status);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get verified documents
    @GetMapping("/verified")
    public ResponseEntity<List<Document>> getVerifiedDocuments() {
        List<Document> documents = documentService.getVerifiedDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get unverified documents
    @GetMapping("/unverified")
    public ResponseEntity<List<Document>> getUnverifiedDocuments() {
        List<Document> documents = documentService.getUnverifiedDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents pending verification
    @GetMapping("/pending-verification")
    public ResponseEntity<List<Document>> getDocumentsPendingVerification() {
        List<Document> documents = documentService.getDocumentsPendingVerification();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by verifier
    @GetMapping("/verifier/{verifierId}")
    public ResponseEntity<List<Document>> getDocumentsByVerifier(@PathVariable Long verifierId) {
        List<Document> documents = documentService.getDocumentsByVerifier(verifierId);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get expired documents
    @GetMapping("/expired")
    public ResponseEntity<List<Document>> getExpiredDocuments() {
        List<Document> documents = documentService.getExpiredDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get expiring documents
    @GetMapping("/expiring")
    public ResponseEntity<List<Document>> getExpiringDocuments(@RequestParam(defaultValue = "30") int daysAhead) {
        List<Document> documents = documentService.getExpiringDocuments(daysAhead);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Find document by file path
    @GetMapping("/file-path")
    public ResponseEntity<Document> findDocumentByFilePath(@RequestParam String filePath) {
        Optional<Document> document = documentService.findDocumentByFilePath(filePath);
        return document.map(d -> new ResponseEntity<>(d, HttpStatus.OK))
                      .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    // Search documents by name
    @GetMapping("/search/name")
    public ResponseEntity<List<Document>> searchDocumentsByName(@RequestParam String documentName) {
        List<Document> documents = documentService.searchDocumentsByName(documentName);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Search documents by description
    @GetMapping("/search/description")
    public ResponseEntity<List<Document>> searchDocumentsByDescription(@RequestParam String keyword) {
        List<Document> documents = documentService.searchDocumentsByDescription(keyword);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Document>> getDocumentsByDateRange(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        List<Document> documents = documentService.getDocumentsByDateRange(startDate, endDate);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get latest version documents
    @GetMapping("/latest-versions")
    public ResponseEntity<List<Document>> getLatestVersionDocuments() {
        List<Document> documents = documentService.getLatestVersionDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get documents by mime type
    @GetMapping("/mime-type/{mimeType}")
    public ResponseEntity<List<Document>> getDocumentsByMimeType(@PathVariable String mimeType) {
        List<Document> documents = documentService.getDocumentsByMimeType(mimeType);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get large files
    @GetMapping("/large-files")
    public ResponseEntity<List<Document>> getLargeFiles(@RequestParam Long sizeThreshold) {
        List<Document> documents = documentService.getLargeFiles(sizeThreshold);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Get recent documents
    @GetMapping("/recent")
    public ResponseEntity<List<Document>> getRecentDocuments(@RequestParam(defaultValue = "7") int days) {
        List<Document> documents = documentService.getRecentDocuments(days);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    // Archive document
    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archiveDocument(@PathVariable Long id) {
        try {
            documentService.archiveDocument(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Mark document as deleted
    @PatchMapping("/{id}/mark-deleted")
    public ResponseEntity<Void> markDocumentAsDeleted(@PathVariable Long id) {
        try {
            documentService.markDocumentAsDeleted(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Status management endpoints
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateDocumentStatus(@PathVariable Long id, @RequestParam DocumentStatus status) {
        try {
            documentService.updateDocumentStatus(id, status);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateDocument(@PathVariable Long id) {
        try {
            documentService.activateDocument(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Void> rejectDocument(@PathVariable Long id) {
        try {
            documentService.rejectDocument(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/mark-for-verification")
    public ResponseEntity<Void> markForVerification(@PathVariable Long id) {
        try {
            documentService.markForVerification(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Verification management endpoints
    @PatchMapping("/{documentId}/verify/{verifierId}")
    public ResponseEntity<Void> verifyDocument(@PathVariable Long documentId, @PathVariable Long verifierId) {
        try {
            documentService.verifyDocument(documentId, verifierId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/unverify")
    public ResponseEntity<Void> unverifyDocument(@PathVariable Long id) {
        try {
            documentService.unverifyDocument(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // File management endpoints
    @PatchMapping("/{documentId}/file-info")
    public ResponseEntity<Void> updateFileInfo(@PathVariable Long documentId,
                                              @RequestParam String filePath,
                                              @RequestParam Long fileSize,
                                              @RequestParam String mimeType) {
        try {
            documentService.updateFileInfo(documentId, filePath, fileSize, mimeType);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Statistics endpoints
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalDocumentCount() {
        long count = documentService.getTotalDocumentCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/type/{documentType}")
    public ResponseEntity<Long> getDocumentCountByType(@PathVariable DocumentType documentType) {
        long count = documentService.getDocumentCountByType(documentType);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/status/{status}")
    public ResponseEntity<Long> getDocumentCountByStatus(@PathVariable DocumentStatus status) {
        long count = documentService.getDocumentCountByStatus(status);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/verified")
    public ResponseEntity<Long> getVerifiedDocumentCount() {
        long count = documentService.getVerifiedDocumentCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/stats/total-file-size")
    public ResponseEntity<Long> getTotalFileSize() {
        Long totalSize = documentService.getTotalFileSize();
        return new ResponseEntity<>(totalSize, HttpStatus.OK);
    }
}
