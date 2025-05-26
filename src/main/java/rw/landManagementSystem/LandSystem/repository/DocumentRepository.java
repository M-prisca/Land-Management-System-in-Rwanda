package rw.landManagementSystem.LandSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.landManagementSystem.LandSystem.model.Document;
import rw.landManagementSystem.LandSystem.model.DocumentStatus;
import rw.landManagementSystem.LandSystem.model.DocumentType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    // Find by land parcel
    List<Document> findByLandParcelId(Long landParcelId);
    List<Document> findByLandParcelIdAndStatus(Long landParcelId, DocumentStatus status);
    List<Document> findByLandParcelIdAndDocumentType(Long landParcelId, DocumentType documentType);
    
    // Find by request
    List<Document> findByRequestId(Long requestId);
    List<Document> findByRequestIdAndStatus(Long requestId, DocumentStatus status);
    
    // Find by uploader
    List<Document> findByUploadedById(Long uploaderId);
    List<Document> findByUploadedByIdAndStatus(Long uploaderId, DocumentStatus status);
    
    // Find by document type
    List<Document> findByDocumentType(DocumentType documentType);
    List<Document> findByDocumentTypeAndStatus(DocumentType documentType, DocumentStatus status);
    
    // Find by status
    List<Document> findByStatus(DocumentStatus status);
    
    // Find verified documents
    @Query("SELECT d FROM Document d WHERE d.isVerified = true")
    List<Document> findVerifiedDocuments();
    
    // Find unverified documents
    @Query("SELECT d FROM Document d WHERE d.isVerified = false AND d.status = 'ACTIVE'")
    List<Document> findUnverifiedDocuments();
    
    // Find documents pending verification
    @Query("SELECT d FROM Document d WHERE d.status = 'PENDING_VERIFICATION'")
    List<Document> findDocumentsPendingVerification();
    
    // Find by verifier
    List<Document> findByVerifiedById(Long verifierId);
    
    // Find expired documents
    @Query("SELECT d FROM Document d WHERE d.expiryDate IS NOT NULL AND d.expiryDate < :currentDate AND d.status = 'ACTIVE'")
    List<Document> findExpiredDocuments(@Param("currentDate") LocalDateTime currentDate);
    
    // Find expiring documents
    @Query("SELECT d FROM Document d WHERE d.expiryDate IS NOT NULL AND d.expiryDate BETWEEN :currentDate AND :expiryDate AND d.status = 'ACTIVE'")
    List<Document> findExpiringDocuments(@Param("currentDate") LocalDateTime currentDate, @Param("expiryDate") LocalDateTime expiryDate);
    
    // Find by file path
    Optional<Document> findByFilePath(String filePath);
    
    // Find by document name
    List<Document> findByDocumentNameContaining(String documentName);
    
    // Find by date range
    @Query("SELECT d FROM Document d WHERE d.createdAt BETWEEN :startDate AND :endDate")
    List<Document> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT d FROM Document d WHERE d.verificationDate BETWEEN :startDate AND :endDate")
    List<Document> findByVerificationDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Find by version
    List<Document> findByVersion(Integer version);
    
    // Find latest version of documents
    @Query("SELECT d FROM Document d WHERE d.version = (SELECT MAX(d2.version) FROM Document d2 WHERE d2.documentName = d.documentName AND d2.landParcel = d.landParcel)")
    List<Document> findLatestVersionDocuments();
    
    // Find by mime type
    List<Document> findByMimeType(String mimeType);
    
    // Find by file size range
    @Query("SELECT d FROM Document d WHERE d.fileSize BETWEEN :minSize AND :maxSize")
    List<Document> findByFileSizeRange(@Param("minSize") Long minSize, @Param("maxSize") Long maxSize);
    
    // Find large files
    @Query("SELECT d FROM Document d WHERE d.fileSize > :sizeThreshold ORDER BY d.fileSize DESC")
    List<Document> findLargeFiles(@Param("sizeThreshold") Long sizeThreshold);
    
    // Count documents by type
    @Query("SELECT COUNT(d) FROM Document d WHERE d.documentType = :documentType")
    long countByDocumentType(@Param("documentType") DocumentType documentType);
    
    // Count documents by status
    @Query("SELECT COUNT(d) FROM Document d WHERE d.status = :status")
    long countByStatus(@Param("status") DocumentStatus status);
    
    // Count verified documents
    @Query("SELECT COUNT(d) FROM Document d WHERE d.isVerified = true")
    long countVerifiedDocuments();
    
    // Calculate total file size
    @Query("SELECT SUM(d.fileSize) FROM Document d WHERE d.status = 'ACTIVE'")
    Long getTotalFileSize();
    
    // Find documents by land parcel and type
    @Query("SELECT d FROM Document d WHERE d.landParcel.id = :landParcelId AND d.documentType = :documentType AND d.status = 'ACTIVE' ORDER BY d.version DESC")
    List<Document> findByLandParcelAndTypeOrderByVersionDesc(@Param("landParcelId") Long landParcelId, @Param("documentType") DocumentType documentType);
    
    // Find recent documents
    @Query("SELECT d FROM Document d WHERE d.createdAt >= :date ORDER BY d.createdAt DESC")
    List<Document> findRecentDocuments(@Param("date") LocalDateTime date);
    
    // Search documents by description
    @Query("SELECT d FROM Document d WHERE LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Document> findByDescriptionContaining(@Param("keyword") String keyword);
}
