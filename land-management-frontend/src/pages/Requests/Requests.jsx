import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, ClipboardDocumentListIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageRequests = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const mockRequests = [
    {
      id: 1,
      requestType: 'TITLE_DEED_ISSUANCE',
      landParcel: { parcelNumber: 'LP001', district: 'Kigali' },
      requester: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      status: 'PENDING',
      priority: 'HIGH',
      submissionDate: '2024-01-15',
      description: 'Request for title deed issuance'
    },
    {
      id: 2,
      requestType: 'LAND_REGISTRATION',
      landParcel: { parcelNumber: 'LP002', district: 'Huye' },
      requester: { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
      status: 'APPROVED',
      priority: 'MEDIUM',
      submissionDate: '2024-02-20',
      description: 'New land registration request'
    },
    {
      id: 3,
      requestType: 'OWNERSHIP_TRANSFER',
      landParcel: { parcelNumber: 'LP003', district: 'Musanze' },
      requester: { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
      status: 'REJECTED',
      priority: 'LOW',
      submissionDate: '2024-03-10',
      description: 'Transfer ownership to new owner'
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
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
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="IN_PROGRESS">In Progress</option>
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
                  {mockRequests.map((request) => (
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
                              {request.requestType.replace(/_/g, ' ')}
                            </div>
                            <div className="text-sm text-gray-500">ID: {request.id}</div>
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
                          {request.status === 'PENDING' && (
                            <>
                              <button className="text-green-600 hover:text-green-900 mr-4">
                                <CheckIcon className="h-4 w-4 inline" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <XMarkIcon className="h-4 w-4 inline" />
                              </button>
                            </>
                          )}
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
    </div>
  );
}

export default Requests;
