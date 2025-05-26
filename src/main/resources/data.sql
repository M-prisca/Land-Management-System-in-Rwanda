-- Sample data for Land Management System
-- This file will be executed automatically when the application starts

-- Insert Users
INSERT INTO users (first_name, last_name, email, phone_number, national_id, address, role, status, created_at, updated_at) 
VALUES 
('John', 'Doe', 'john.doe@example.com', '0781234567', '1234567890123456', 'Kigali, Rwanda', 'CITIZEN', 'ACTIVE', NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '0787654321', '6543210987654321', 'Butare, Rwanda', 'LAND_OFFICER', 'ACTIVE', NOW(), NOW()),
('Admin', 'User', 'admin@landsystem.rw', '0780000000', '1111111111111111', 'Kigali, Rwanda', 'ADMIN', 'ACTIVE', NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson@example.com', '0782345678', '2345678901234567', 'Musanze, Rwanda', 'CITIZEN', 'ACTIVE', NOW(), NOW()),
('Bob', 'Wilson', 'bob.wilson@example.com', '0783456789', '3456789012345678', 'Rubavu, Rwanda', 'CITIZEN', 'ACTIVE', NOW(), NOW());

-- Insert Land Parcels
INSERT INTO land_parcels (parcel_number, location, district, sector, cell, area_sqm, land_use, status, description, created_at, updated_at)
VALUES 
('LP001', 'Kimisagara', 'Nyarugenge', 'Nyarugenge', 'Kimisagara', 500.00, 'RESIDENTIAL', 'AVAILABLE', 'Residential plot in Kimisagara', NOW(), NOW()),
('LP002', 'Kacyiru', 'Gasabo', 'Kacyiru', 'Kamatamu', 1000.00, 'COMMERCIAL', 'AVAILABLE', 'Commercial plot in Kacyiru', NOW(), NOW()),
('LP003', 'Remera', 'Gasabo', 'Remera', 'Gisozi', 750.00, 'RESIDENTIAL', 'OCCUPIED', 'Residential plot in Remera', NOW(), NOW()),
('LP004', 'Nyamirambo', 'Nyarugenge', 'Nyamirambo', 'Biryogo', 300.00, 'RESIDENTIAL', 'AVAILABLE', 'Small residential plot', NOW(), NOW()),
('LP005', 'Kicukiro', 'Kicukiro', 'Kicukiro', 'Gahanga', 2000.00, 'AGRICULTURAL', 'AVAILABLE', 'Agricultural land in Kicukiro', NOW(), NOW());

-- Insert Ownerships
INSERT INTO ownerships (user_id, land_parcel_id, ownership_percentage, ownership_type, acquisition_date, start_date, acquisition_method, status, title_deed_number, created_at, updated_at)
VALUES 
(1, 1, 100.00, 'FULL_OWNERSHIP', '2024-01-15', '2024-01-15', 'PURCHASE', 'ACTIVE', 'TD001', NOW(), NOW()),
(4, 3, 100.00, 'FULL_OWNERSHIP', '2024-02-10', '2024-02-10', 'INHERITANCE', 'ACTIVE', 'TD003', NOW(), NOW()),
(5, 5, 100.00, 'FULL_OWNERSHIP', '2024-03-05', '2024-03-05', 'GOVERNMENT_ALLOCATION', 'ACTIVE', 'TD005', NOW(), NOW());

-- Insert Requests
INSERT INTO requests (requester_id, land_parcel_id, request_type, description, status, priority, submission_date, request_number, assigned_officer_id, created_at, updated_at)
VALUES 
(1, 1, 'TITLE_DEED_ISSUANCE', 'Request for title deed issuance for residential plot LP001', 'PENDING', 'NORMAL', NOW(), 'REQ-2024-000001', 2, NOW(), NOW()),
(4, 2, 'LAND_REGISTRATION', 'Request to register commercial land parcel LP002', 'UNDER_REVIEW', 'HIGH', NOW(), 'REQ-2024-000002', 2, NOW(), NOW()),
(5, 4, 'OWNERSHIP_TRANSFER', 'Request to transfer ownership of LP004', 'PENDING', 'NORMAL', NOW(), 'REQ-2024-000003', NULL, NOW(), NOW());

-- Insert Documents
INSERT INTO documents (document_name, document_type, description, land_parcel_id, uploaded_by, status, file_path, mime_type, is_verified, version, created_at, updated_at)
VALUES 
('Title Deed - LP001', 'TITLE_DEED', 'Official title deed for LP001', 1, 1, 'ACTIVE', '/documents/title_deed_lp001.pdf', 'application/pdf', true, 1, NOW(), NOW()),
('Survey Plan - LP002', 'SURVEY_PLAN', 'Survey plan for LP002', 2, 2, 'ACTIVE', '/documents/survey_plan_lp002.pdf', 'application/pdf', true, 1, NOW(), NOW()),
('Identity Document - John Doe', 'IDENTITY_DOCUMENT', 'National ID copy for John Doe', 1, 1, 'ACTIVE', '/documents/id_john_doe.pdf', 'application/pdf', true, 1, NOW(), NOW()),
('Proof of Payment - LP003', 'PROOF_OF_PAYMENT', 'Payment receipt for LP003 registration', 3, 4, 'PENDING_VERIFICATION', '/documents/payment_lp003.pdf', 'application/pdf', false, 1, NOW(), NOW());
