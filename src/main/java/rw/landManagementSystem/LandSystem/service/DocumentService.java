package rw.landManagementSystem.LandSystem.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.landManagementSystem.LandSystem.model.Document;
import rw.landManagementSystem.LandSystem.model.DocumentStatus;
import rw.landManagementSystem.LandSystem.model.DocumentType;
import rw.landManagementSystem.LandSystem.model.User;
import rw.landManagementSystem.LandSystem.repository.DocumentRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserService userService;

    public DocumentService(DocumentRepository documentRepository, UserService userService) {
        this.documentRepository = documentRepository;
        this.userService = userService;
    }

    // Create and Update operations
    public Document createDocument(Document document) {
        validateDocumentForCreation(document);
        return documentRepository.save(document);
    }

    public Document updateDocument(Long id, Document documentDetails) {
        Document existingDocument = getDocumentById(id);
        updateDocumentFields(existingDocument, documentDetails);
        return documentRepository.save(existingDocument);
    }

    // Read operations
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
    }

    public List<Document> getDocumentsByLandParcel(Long landParcelId) {
        return documentRepository.findByLandParcelId(landParcelId);
    }

    public List<Document> getDocumentsByLandParcelAndStatus(Long landParcelId, DocumentStatus status) {
        return documentRepository.findByLandParcelIdAndStatus(landParcelId, status);
    }

    public List<Document> getDocumentsByLandParcelAndType(Long landParcelId, DocumentType documentType) {
        return documentRepository.findByLandParcelIdAndDocumentType(landParcelId, documentType);
    }

    public List<Document> getDocumentsByRequest(Long requestId) {
        return documentRepository.findByRequestId(requestId);
    }

    public List<Document> getDocumentsByUploader(Long uploaderId) {
        return documentRepository.findByUploadedById(uploaderId);
    }

    public List<Document> getDocumentsByType(DocumentType documentType) {
        return documentRepository.findByDocumentType(documentType);
    }

    public List<Document> getDocumentsByStatus(DocumentStatus status) {
        return documentRepository.findByStatus(status);
    }

    public List<Document> getVerifiedDocuments() {
        return documentRepository.findVerifiedDocuments();
    }

    public List<Document> getUnverifiedDocuments() {
        return documentRepository.findUnverifiedDocuments();
    }

    public List<Document> getDocumentsPendingVerification() {
        return documentRepository.findDocumentsPendingVerification();
    }

    public List<Document> getDocumentsByVerifier(Long verifierId) {
        return documentRepository.findByVerifiedById(verifierId);
    }

    public List<Document> getExpiredDocuments() {
        return documentRepository.findExpiredDocuments(LocalDateTime.now());
    }

    public List<Document> getExpiringDocuments(int daysAhead) {
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime expiryDate = currentDate.plusDays(daysAhead);
        return documentRepository.findExpiringDocuments(currentDate, expiryDate);
    }

    public Optional<Document> findDocumentByFilePath(String filePath) {
        return documentRepository.findByFilePath(filePath);
    }

    public List<Document> searchDocumentsByName(String documentName) {
        return documentRepository.findByDocumentNameContaining(documentName);
    }

    public List<Document> searchDocumentsByDescription(String keyword) {
        return documentRepository.findByDescriptionContaining(keyword);
    }

    public List<Document> getDocumentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return documentRepository.findByCreatedAtBetween(startDate, endDate);
    }

    public List<Document> getLatestVersionDocuments() {
        return documentRepository.findLatestVersionDocuments();
    }

    public List<Document> getDocumentsByMimeType(String mimeType) {
        return documentRepository.findByMimeType(mimeType);
    }

    public List<Document> getLargeFiles(Long sizeThreshold) {
        return documentRepository.findLargeFiles(sizeThreshold);
    }

    public List<Document> getRecentDocuments(int days) {
        LocalDateTime date = LocalDateTime.now().minusDays(days);
        return documentRepository.findRecentDocuments(date);
    }

    // Delete operations
    public void deleteDocument(Long id) {
        Document document = getDocumentById(id);
        documentRepository.delete(document);
    }

    public void archiveDocument(Long id) {
        updateDocumentStatus(id, DocumentStatus.ARCHIVED);
    }

    public void markDocumentAsDeleted(Long id) {
        updateDocumentStatus(id, DocumentStatus.DELETED);
    }

    // Status management
    public void updateDocumentStatus(Long id, DocumentStatus status) {
        Document document = getDocumentById(id);
        document.setStatus(status);
        documentRepository.save(document);
    }

    public void activateDocument(Long id) {
        updateDocumentStatus(id, DocumentStatus.ACTIVE);
    }

    public void rejectDocument(Long id) {
        updateDocumentStatus(id, DocumentStatus.REJECTED);
    }

    public void markForVerification(Long id) {
        updateDocumentStatus(id, DocumentStatus.PENDING_VERIFICATION);
    }

    // Verification management
    public void verifyDocument(Long documentId, Long verifierId) {
        Document document = getDocumentById(documentId);
        User verifier = userService.getUserById(verifierId);

        document.setIsVerified(true);
        document.setVerifiedBy(verifier);
        document.setVerificationDate(LocalDateTime.now());
        document.setStatus(DocumentStatus.ACTIVE);

        documentRepository.save(document);
    }

    public void unverifyDocument(Long id) {
        Document document = getDocumentById(id);
        document.setIsVerified(false);
        document.setVerifiedBy(null);
        document.setVerificationDate(null);
        documentRepository.save(document);
    }

    // File management
    public void updateFileInfo(Long documentId, String filePath, Long fileSize, String mimeType) {
        Document document = getDocumentById(documentId);
        document.setFilePath(filePath);
        document.setFileSize(fileSize);
        document.setMimeType(mimeType);
        documentRepository.save(document);
    }

    // Statistics and counts
    public long getTotalDocumentCount() {
        return documentRepository.count();
    }

    public long getDocumentCountByType(DocumentType documentType) {
        return documentRepository.countByDocumentType(documentType);
    }

    public long getDocumentCountByStatus(DocumentStatus status) {
        return documentRepository.countByStatus(status);
    }

    public long getVerifiedDocumentCount() {
        return documentRepository.countVerifiedDocuments();
    }

    public Long getTotalFileSize() {
        return documentRepository.getTotalFileSize();
    }

    // Validation methods
    private void validateDocumentForCreation(Document document) {
        if (document.getDocumentName() == null || document.getDocumentName().trim().isEmpty()) {
            throw new RuntimeException("Document name is required");
        }
        if (document.getDocumentType() == null) {
            throw new RuntimeException("Document type is required");
        }
        if (document.getUploadedBy() == null) {
            throw new RuntimeException("Uploader information is required");
        }
    }

    private void updateDocumentFields(Document existingDocument, Document documentDetails) {
        if (documentDetails.getDocumentName() != null) {
            existingDocument.setDocumentName(documentDetails.getDocumentName());
        }
        if (documentDetails.getDescription() != null) {
            existingDocument.setDescription(documentDetails.getDescription());
        }
        if (documentDetails.getStatus() != null) {
            existingDocument.setStatus(documentDetails.getStatus());
        }
        if (documentDetails.getExpiryDate() != null) {
            existingDocument.setExpiryDate(documentDetails.getExpiryDate());
        }
        if (documentDetails.getFilePath() != null) {
            existingDocument.setFilePath(documentDetails.getFilePath());
        }
        if (documentDetails.getFileSize() != null) {
            existingDocument.setFileSize(documentDetails.getFileSize());
        }
        if (documentDetails.getMimeType() != null) {
            existingDocument.setMimeType(documentDetails.getMimeType());
        }
    }
}
