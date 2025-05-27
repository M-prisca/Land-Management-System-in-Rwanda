import React, { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Request Modal Component
const RequestModal = ({ isOpen, onClose, request = null, onSave }) => {
  const [formData, setFormData] = useState({
    requestType: 'LAND_REGISTRATION',
    description: '',
    landParcelId: '',
    priority: 'MEDIUM',
  });

  React.useEffect(() => {
    if (request) {
      setFormData({
        requestType: request.requestType || 'LAND_REGISTRATION',
        description: request.description || '',
        landParcelId: request.landParcel?.parcelNumber || '',
        priority: request.priority || 'MEDIUM',
      });
    }
  }, [request]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          {request ? 'Edit Request' : 'Create New Request'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="LAND_REGISTRATION">Land Registration</option>
            <option value="OWNERSHIP_TRANSFER">Ownership Transfer</option>
            <option value="TITLE_DEED_ISSUANCE">Title Deed Issuance</option>
            <option value="LAND_SUBDIVISION">Land Subdivision</option>
            <option value="BOUNDARY_SURVEY">Boundary Survey</option>
            <option value="OWNERSHIP_VERIFICATION">Ownership Verification</option>
            <option value="LAND_USE_PERMIT">Land Use Permit</option>
            <option value="OTHER">Other</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            rows="4"
            placeholder="Request description..."
            required
          />
          <input
            name="landParcelId"
            value={formData.landParcelId}
            onChange={handleChange}
            className="input"
            placeholder="Land Parcel ID (if applicable)"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input"
          >
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
            <option value="URGENT">Urgent</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {request ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageRequests = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestNumber: 'REQ-2024-001',
      requestType: 'TITLE_DEED_ISSUANCE',
      landParcel: { parcelNumber: 'LP001', district: 'Kigali', sector: 'Nyarugenge' },
      requester: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      status: 'PENDING',
      priority: 'HIGH',
      submissionDate: '2024-01-15',
      lastUpdated: '2024-01-16',
      assignedOfficer: null,
      estimatedCompletion: '2024-02-15',
      description: 'Request for title deed issuance for registered land parcel',
      documents: ['application_form.pdf', 'identity_copy.pdf'],
      comments: []
    },
    {
      id: 2,
      requestNumber: 'REQ-2024-002',
      requestType: 'LAND_REGISTRATION',
      landParcel: { parcelNumber: 'LP002', district: 'Huye', sector: 'Tumba' },
      requester: { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      submissionDate: '2024-02-20',
      lastUpdated: '2024-02-25',
      assignedOfficer: 'Officer Smith',
      estimatedCompletion: '2024-03-20',
      description: 'New land registration request for agricultural land',
      documents: ['survey_report.pdf', 'ownership_proof.pdf'],
      comments: [{ text: 'Documents verified', date: '2024-02-25', author: 'Officer Smith' }]
    },
    {
      id: 3,
      requestNumber: 'REQ-2024-003',
      requestType: 'OWNERSHIP_TRANSFER',
      landParcel: { parcelNumber: 'LP003', district: 'Musanze', sector: 'Muhoza' },
      requester: { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
      status: 'COMPLETED',
      priority: 'LOW',
      submissionDate: '2024-03-10',
      lastUpdated: '2024-03-25',
      assignedOfficer: 'Officer Brown',
      estimatedCompletion: '2024-04-10',
      description: 'Transfer ownership from previous owner to new owner',
      documents: ['transfer_agreement.pdf', 'previous_title.pdf'],
      comments: [
        { text: 'Transfer approved', date: '2024-03-20', author: 'Officer Brown' },
        { text: 'New title deed issued', date: '2024-03-25', author: 'Officer Brown' }
      ]
    },
    {
      id: 4,
      requestNumber: 'REQ-2024-004',
      requestType: 'BOUNDARY_SURVEY',
      landParcel: { parcelNumber: 'LP004', district: 'Rubavu', sector: 'Gisenyi' },
      requester: { firstName: 'Bob', lastName: 'Wilson', email: 'bob@example.com' },
      status: 'REJECTED',
      priority: 'MEDIUM',
      submissionDate: '2024-03-15',
      lastUpdated: '2024-03-20',
      assignedOfficer: 'Officer Johnson',
      estimatedCompletion: null,
      description: 'Survey land boundaries for dispute resolution',
      documents: ['dispute_report.pdf'],
      comments: [{ text: 'Insufficient documentation provided', date: '2024-03-20', author: 'Officer Johnson' }]
    },
    {
      id: 5,
      requestNumber: 'REQ-2024-005',
      requestType: 'LAND_SUBDIVISION',
      landParcel: { parcelNumber: 'LP005', district: 'Nyagatare', sector: 'Karangazi' },
      requester: { firstName: 'Carol', lastName: 'Davis', email: 'carol@example.com' },
      status: 'PENDING',
      priority: 'URGENT',
      submissionDate: '2024-03-20',
      lastUpdated: '2024-03-20',
      assignedOfficer: null,
      estimatedCompletion: '2024-04-20',
      description: 'Subdivide large parcel into smaller residential plots',
      documents: ['subdivision_plan.pdf', 'current_title.pdf'],
      comments: []
    }
  ]);

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requester.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requester.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.landParcel?.parcelNumber && req.landParcel.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter ? req.status === statusFilter : true;
    const matchesType = typeFilter ? req.requestType === typeFilter : true;
    const matchesPriority = priorityFilter ? req.priority === priorityFilter : true;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Action handlers
  const handleSaveRequest = (requestData) => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((r) => (r.id === selectedRequest.id ? { ...r, ...requestData } : r))
      );
    } else {
      setRequests((prev) => [
        ...prev,
        {
          ...requestData,
          id: prev.length + 1,
          requestNumber: `REQ-2024-${String(prev.length + 1).padStart(3, '0')}`,
          requester: { firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email },
          status: 'PENDING',
          submissionDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
          assignedOfficer: null,
          comments: [],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleApproveRequest = (reqId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === reqId
          ? {
              ...req,
              status: 'IN_PROGRESS',
              assignedOfficer: currentUser.firstName + ' ' + currentUser.lastName,
              lastUpdated: new Date().toISOString().split('T')[0],
              comments: [
                ...req.comments,
                {
                  text: 'Request approved and assigned',
                  date: new Date().toISOString().split('T')[0],
                  author: currentUser.firstName + ' ' + currentUser.lastName,
                },
              ],
            }
          : req
      )
    );
  };

  const handleRejectRequest = (reqId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === reqId
            ? {
                ...req,
                status: 'REJECTED',
                lastUpdated: new Date().toISOString().split('T')[0],
                comments: [
                  ...req.comments,
                  {
                    text: `Request rejected: ${reason}`,
                    date: new Date().toISOString().split('T')[0],
                    author: currentUser.firstName + ' ' + currentUser.lastName,
                  },
                ],
              }
            : req
        )
      );
    }
  };

  const handleCompleteRequest = (reqId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === reqId
          ? {
              ...req,
              status: 'COMPLETED',
              lastUpdated: new Date().toISOString().split('T')[0],
              comments: [
                ...req.comments,
                {
                  text: 'Request completed successfully',
                  date: new Date().toISOString().split('T')[0],
                  author: currentUser.firstName + ' ' + currentUser.lastName,
                },
              ],
            }
          : req
      )
    );
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'ON_HOLD':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800';
      case 'LOW':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage land registration and transfer requests.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSelectedRequest(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Request
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
              placeholder="Search by requester, parcel number, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="LAND_REGISTRATION">Land Registration</option>
            <option value="OWNERSHIP_TRANSFER">Ownership Transfer</option>
            <option value="TITLE_DEED_ISSUANCE">Title Deed Issuance</option>
            <option value="LAND_SUBDIVISION">Land Subdivision</option>
            <option value="BOUNDARY_SURVEY">Boundary Survey</option>
            <option value="OWNERSHIP_VERIFICATION">Ownership Verification</option>
            <option value="LAND_USE_PERMIT">Land Use Permit</option>
            <option value="OTHER">Other</option>
          </select>
          <select
            className="input"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      {/* Requests table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Land Parcel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    {canManageRequests && (
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                              <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.requestNumber}
                            </div>
                            <div className="text-sm text-gray-500">{request.requestType.replace(/_/g, ' ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.requester.firstName} {request.requester.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{request.requester.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.landParcel.parcelNumber}</div>
                        <div className="text-sm text-gray-500">{request.landParcel.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.submissionDate).toLocaleDateString()}
                      </td>
                      {canManageRequests && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" title="View Details">
                              <EyeIcon className="h-4 w-4 inline" />
                            </button>
                            {request.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Approve"
                                >
                                  <CheckIcon className="h-4 w-4 inline" />
                                </button>
                                <button
                                  onClick={() => handleRejectRequest(request.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Reject"
                                >
                                  <XMarkIcon className="h-4 w-4 inline" />
                                </button>
                              </>
                            )}
                            {request.status === 'IN_PROGRESS' && (
                              <button
                                onClick={() => handleCompleteRequest(request.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Mark Complete"
                              >
                                <CheckIcon className="h-4 w-4 inline" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4 inline" />
                            </button>
                          </div>
                        </td>
                      )}
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{' '}
            {filteredRequests.length} requests
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

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onSave={handleSaveRequest}
      />
    </div>
  );
}

export default Requests;
