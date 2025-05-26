import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, DocumentTextIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageDocuments = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const mockDocuments = [
    {
      id: 1,
      documentType: 'TITLE_DEED',
      fileName: 'title_deed_LP001.pdf',
      landParcel: { parcelNumber: 'LP001', district: 'Kigali' },
      uploader: { firstName: 'John', lastName: 'Doe' },
      status: 'VERIFIED',
      uploadDate: '2024-01-15',
      fileSize: '2.5 MB'
    },
    {
      id: 2,
      documentType: 'SURVEY_REPORT',
      fileName: 'survey_LP002.pdf',
      landParcel: { parcelNumber: 'LP002', district: 'Huye' },
      uploader: { firstName: 'Jane', lastName: 'Smith' },
      status: 'PENDING',
      uploadDate: '2024-02-20',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      documentType: 'OWNERSHIP_CERTIFICATE',
      fileName: 'ownership_cert_LP003.pdf',
      landParcel: { parcelNumber: 'LP003', district: 'Musanze' },
      uploader: { firstName: 'Alice', lastName: 'Johnson' },
      status: 'REJECTED',
      uploadDate: '2024-03-10',
      fileSize: '3.2 MB'
    }
  ];

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
      default:
        return 'bg-gray-100 text-gray-800';
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
                  {mockDocuments.map((document) => (
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
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <EyeIcon className="h-4 w-4 inline" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <ArrowDownTrayIcon className="h-4 w-4 inline" />
                        </button>
                      </td>
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

export default Documents;
