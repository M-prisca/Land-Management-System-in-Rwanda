import React, { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Document Modal Component
const DocumentModal = ({ isOpen, onClose, document = null, onSave }) => {
  const [formData, setFormData] = useState({
    documentName: '',
    documentType: 'TITLE_DEED',
    description: '',
    landParcelId: '',
    requestId: '',
    file: null,
  });

  React.useEffect(() => {
    if (document) {
      setFormData({
        documentName: document.fileName || '',
        documentType: document.documentType || 'TITLE_DEED',
        description: document.description || '',
        landParcelId: document.landParcel?.parcelNumber || '',
        requestId: document.requestId || '',
        file: null,
      });
    }
  }, [document]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {document ? 'Edit Document' : 'Upload New Document'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="documentName"
            value={formData.documentName}
            onChange={handleChange}
            className="input"
            required
            placeholder="Document Name"
          />
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className="input"
          >
            <option value="TITLE_DEED">Title Deed</option>
            <option value="APPLICATION_FORM">Application Form</option>
            <option value="IDENTITY_DOCUMENT">Identity Document</option>
            <option value="SURVEY_REPORT">Survey Report</option>
            <option value="OWNERSHIP_CERTIFICATE">Ownership Certificate</option>
            <option value="LEGAL_DOCUMENT">Legal Document</option>
            <option value="OTHER">Other</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            rows="3"
            placeholder="Description"
          />
          <input
            name="landParcelId"
            value={formData.landParcelId}
            onChange={handleChange}
            className="input"
            placeholder="Land Parcel ID (optional)"
          />
          <input
            name="requestId"
            value={formData.requestId}
            onChange={handleChange}
            className="input"
            placeholder="Request ID (optional)"
          />
          {!document && (
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="input"
              required
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          )}
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {document ? 'Update' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageDocuments = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const [documents, setDocuments] = useState([
    {
      id: 1,
      documentType: 'TITLE_DEED',
      fileName: 'title_deed_LP001.pdf',
      landParcel: { parcelNumber: 'LP001', district: 'Kigali' },
      uploader: { firstName: 'John', lastName: 'Doe' },
      status: 'VERIFIED',
      uploadDate: '2024-01-15',
      fileSize: '2.5 MB',
      description: 'Official title deed for land parcel LP001',
      verifiedBy: 'Officer Smith',
      verificationDate: '2024-01-16'
    },
    {
      id: 2,
      documentType: 'SURVEY_REPORT',
      fileName: 'survey_LP002.pdf',
      landParcel: { parcelNumber: 'LP002', district: 'Huye' },
      uploader: { firstName: 'Jane', lastName: 'Smith' },
      status: 'PENDING',
      uploadDate: '2024-02-20',
      fileSize: '1.8 MB',
      description: 'Land survey report for parcel LP002'
    },
    {
      id: 3,
      documentType: 'OWNERSHIP_CERTIFICATE',
      fileName: 'ownership_cert_LP003.pdf',
      landParcel: { parcelNumber: 'LP003', district: 'Musanze' },
      uploader: { firstName: 'Alice', lastName: 'Johnson' },
      status: 'REJECTED',
      uploadDate: '2024-03-10',
      fileSize: '3.2 MB',
      description: 'Ownership certificate for land parcel LP003',
      rejectionReason: 'Document quality insufficient'
    },
    {
      id: 4,
      documentType: 'APPLICATION_FORM',
      fileName: 'application_REQ001.pdf',
      landParcel: null,
      uploader: { firstName: 'Bob', lastName: 'Wilson' },
      status: 'PENDING',
      uploadDate: '2024-03-15',
      fileSize: '0.8 MB',
      description: 'Land ownership application form',
      requestId: 'REQ001'
    },
    {
      id: 5,
      documentType: 'IDENTITY_DOCUMENT',
      fileName: 'national_id_copy.pdf',
      landParcel: null,
      uploader: { firstName: 'Carol', lastName: 'Davis' },
      status: 'VERIFIED',
      uploadDate: '2024-03-18',
      fileSize: '0.5 MB',
      description: 'National ID copy for verification',
      verifiedBy: 'Officer Brown',
      verificationDate: '2024-03-19'
    }
  ]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeColor = (type) => {
    switch (type) {
      case 'TITLE_DEED':
        return 'bg-blue-100 text-blue-800';
      case 'SURVEY_REPORT':
        return 'bg-purple-100 text-purple-800';
      case 'OWNERSHIP_CERTIFICATE':
        return 'bg-green-100 text-green-800';
      case 'LEGAL_DOCUMENT':
        return 'bg-red-100 text-red-800';
      case 'APPLICATION_FORM':
        return 'bg-yellow-100 text-yellow-800';
      case 'IDENTITY_DOCUMENT':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploader.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploader.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.landParcel?.parcelNumber && doc.landParcel.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.requestId && doc.requestId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter ? doc.documentType === typeFilter : true;
    const matchesStatus = statusFilter ? doc.status === statusFilter : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  // Action handlers
  const handleSaveDocument = (documentData) => {
    if (selectedDocument) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === selectedDocument.id ? { ...d, ...documentData } : d))
      );
    } else {
      setDocuments((prev) => [
        ...prev,
        {
          ...documentData,
          id: prev.length + 1,
          fileName: documentData.file ? documentData.file.name : documentData.documentName,
          uploader: { firstName: currentUser.firstName, lastName: currentUser.lastName },
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'PENDING',
          fileSize: documentData.file ? (documentData.file.size / (1024 * 1024)).toFixed(1) + ' MB' : 'Unknown',
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleVerifyDocument = (docId) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status: 'VERIFIED',
              verifiedBy: currentUser.firstName + ' ' + currentUser.lastName,
              verificationDate: new Date().toISOString().split('T')[0],
            }
          : doc
      )
    );
  };

  const handleRejectDocument = (docId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                status: 'REJECTED',
                rejectionReason: reason,
              }
            : doc
        )
      );
    }
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage documents, certificates, and legal papers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedDocument(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by document name, parcel number, or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="TITLE_DEED">Title Deed</option>
            <option value="SURVEY_REPORT">Survey Report</option>
            <option value="OWNERSHIP_CERTIFICATE">Ownership Certificate</option>
            <option value="LEGAL_DOCUMENT">Legal Document</option>
            <option value="APPLICATION_FORM">Application Form</option>
            <option value="IDENTITY_DOCUMENT">Identity Document</option>
            <option value="OTHER">Other</option>
          </select>
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="VERIFIED">Verified</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACTIVE">Active</option>
          </select>
        </div>
      </div>

      {/* Documents table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Land Parcel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploader
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <DocumentTextIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {document.fileName}
                            </div>
                            <div className="text-sm text-gray-500">{document.fileSize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentTypeColor(document.documentType)}`}>
                          {document.documentType.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.landParcel.parcelNumber}</div>
                        <div className="text-sm text-gray-500">{document.landParcel.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {document.uploader.firstName} {document.uploader.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(document.status)}`}>
                          {document.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900" title="View">
                            <EyeIcon className="h-4 w-4 inline" />
                          </button>
                          <button className="text-green-600 hover:text-green-900" title="Download">
                            <ArrowDownTrayIcon className="h-4 w-4 inline" />
                          </button>
                          {canManageDocuments && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedDocument(document);
                                  setIsModalOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Edit"
                              >
                                <PencilIcon className="h-4 w-4 inline" />
                              </button>
                              {document.status === 'PENDING' && (
                                <>
                                  <button
                                    onClick={() => handleVerifyDocument(document.id)}
                                    className="text-green-600 hover:text-green-900"
                                    title="Verify"
                                  >
                                    <CheckIcon className="h-4 w-4 inline" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectDocument(document.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Reject"
                                  >
                                    <XMarkIcon className="h-4 w-4 inline" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleDeleteDocument(document.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <TrashIcon className="h-4 w-4 inline" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDocuments.length)} of{' '}
            {filteredDocuments.length} documents
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={selectedDocument}
        onSave={handleSaveDocument}
      />
    </div>
  );
}

export default Documents;
