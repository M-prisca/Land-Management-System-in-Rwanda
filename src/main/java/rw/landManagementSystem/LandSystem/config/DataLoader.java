package rw.landManagementSystem.LandSystem.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import rw.landManagementSystem.LandSystem.model.*;
import rw.landManagementSystem.LandSystem.service.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserService userService;
    private final LandParcelService landParcelService;
    private final OwnershipService ownershipService;
    private final RequestService requestService;
    private final DocumentService documentService;

    public DataLoader(UserService userService, LandParcelService landParcelService,
                     OwnershipService ownershipService, RequestService requestService,
                     DocumentService documentService) {
        this.userService = userService;
        this.landParcelService = landParcelService;
        this.ownershipService = ownershipService;
        this.requestService = requestService;
        this.documentService = documentService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only load data if database is empty
        if (userService.getTotalUserCount() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        // Create Users
        User admin = new User("Admin", "User", "admin@landsystem.rw", "0780000000", "1111111111111111");
        admin.setAddress("Kigali, Rwanda");
        admin.setRole(UserRole.ADMIN);
        admin = userService.createUser(admin);

        User officer = new User("Jane", "Smith", "jane.smith@example.com", "0787654321", "6543210987654321");
        officer.setAddress("Butare, Rwanda");
        officer.setRole(UserRole.LAND_OFFICER);
        officer = userService.createUser(officer);

        User citizen1 = new User("John", "Doe", "john.doe@example.com", "0781234567", "1234567890123456");
        citizen1.setAddress("Kigali, Rwanda");
        citizen1.setRole(UserRole.CITIZEN);
        citizen1 = userService.createUser(citizen1);

        User citizen2 = new User("Alice", "Johnson", "alice.johnson@example.com", "0782345678", "2345678901234567");
        citizen2.setAddress("Musanze, Rwanda");
        citizen2.setRole(UserRole.CITIZEN);
        citizen2 = userService.createUser(citizen2);

        // Create Land Parcels
        LandParcel parcel1 = new LandParcel("LP001", "Kimisagara", "Nyarugenge", "Nyarugenge", "Kimisagara",
                                          new BigDecimal("500.00"), LandUse.RESIDENTIAL);
        parcel1.setDescription("Residential plot in Kimisagara");
        parcel1 = landParcelService.createLandParcel(parcel1);

        LandParcel parcel2 = new LandParcel("LP002", "Kacyiru", "Gasabo", "Kacyiru", "Kamatamu",
                                          new BigDecimal("1000.00"), LandUse.COMMERCIAL);
        parcel2.setDescription("Commercial plot in Kacyiru");
        parcel2 = landParcelService.createLandParcel(parcel2);

        LandParcel parcel3 = new LandParcel("LP003", "Remera", "Gasabo", "Remera", "Gisozi",
                                          new BigDecimal("750.00"), LandUse.RESIDENTIAL);
        parcel3.setDescription("Residential plot in Remera");
        parcel3.setStatus(LandStatus.OCCUPIED);
        parcel3 = landParcelService.createLandParcel(parcel3);

        // Create Ownerships
        Ownership ownership1 = new Ownership();
        ownership1.setUser(citizen1);
        ownership1.setLandParcel(parcel1);
        ownership1.setOwnershipPercentage(new BigDecimal("100.00"));
        ownership1.setOwnershipType(OwnershipType.FULL_OWNERSHIP);
        ownership1.setAcquisitionDate(LocalDate.of(2024, 1, 15));
        ownership1.setStartDate(LocalDate.of(2024, 1, 15));
        ownership1.setAcquisitionMethod(AcquisitionMethod.PURCHASE);
        ownership1.setTitleDeedNumber("TD001");
        ownershipService.createOwnership(ownership1);

        Ownership ownership2 = new Ownership();
        ownership2.setUser(citizen2);
        ownership2.setLandParcel(parcel3);
        ownership2.setOwnershipPercentage(new BigDecimal("100.00"));
        ownership2.setOwnershipType(OwnershipType.FULL_OWNERSHIP);
        ownership2.setAcquisitionDate(LocalDate.of(2024, 2, 10));
        ownership2.setStartDate(LocalDate.of(2024, 2, 10));
        ownership2.setAcquisitionMethod(AcquisitionMethod.INHERITANCE);
        ownership2.setTitleDeedNumber("TD003");
        ownershipService.createOwnership(ownership2);

        // Create Requests
        Request request1 = new Request();
        request1.setRequester(citizen1);
        request1.setLandParcel(parcel1);
        request1.setRequestType(RequestType.TITLE_DEED_ISSUANCE);
        request1.setDescription("Request for title deed issuance for residential plot LP001");
        request1.setPriority(RequestPriority.NORMAL);
        request1.setAssignedOfficer(officer);
        requestService.createRequest(request1);

        Request request2 = new Request();
        request2.setRequester(citizen2);
        request2.setLandParcel(parcel2);
        request2.setRequestType(RequestType.LAND_REGISTRATION);
        request2.setDescription("Request to register commercial land parcel LP002");
        request2.setPriority(RequestPriority.HIGH);
        request2.setAssignedOfficer(officer);
        requestService.createRequest(request2);

        // Create Documents
        Document document1 = new Document();
        document1.setDocumentType(DocumentType.TITLE_DEED);
        document1.setDocumentName("title_deed_LP001.pdf");
        document1.setLandParcel(parcel1);
        document1.setUploadedBy(citizen1);
        document1.setStatus(DocumentStatus.ACTIVE);
        document1.setIsVerified(true);
        document1.setFilePath("/documents/title_deed_LP001.pdf");
        document1.setDescription("Title deed for residential plot LP001");
        documentService.createDocument(document1);

        Document document2 = new Document();
        document2.setDocumentType(DocumentType.SURVEY_PLAN);
        document2.setDocumentName("survey_plan_LP002.pdf");
        document2.setLandParcel(parcel2);
        document2.setUploadedBy(officer);
        document2.setStatus(DocumentStatus.PENDING_VERIFICATION);
        document2.setIsVerified(false);
        document2.setFilePath("/documents/survey_plan_LP002.pdf");
        document2.setDescription("Survey plan for commercial plot LP002");
        documentService.createDocument(document2);

        System.out.println("✅ Sample data loaded successfully!");
        System.out.println("👥 Users: " + userService.getTotalUserCount());
        System.out.println("🏞️ Land Parcels: " + landParcelService.getTotalLandParcelCount());
        System.out.println("🏠 Ownerships: " + ownershipService.getTotalOwnershipCount());
        System.out.println("📋 Requests: " + requestService.getTotalRequestCount());
        System.out.println("📄 Documents: " + documentService.getTotalDocumentCount());
    }
}
