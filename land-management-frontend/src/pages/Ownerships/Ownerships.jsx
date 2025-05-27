import React, { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
  EyeIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Ownership Modal Component
const OwnershipModal = ({ isOpen, onClose, ownership = null, onSave }) => {
  const [formData, setFormData] = useState({
    userId: ownership?.user?.id || '',
    landParcelId: ownership?.landParcel?.id || '',
    ownershipPercentage: ownership?.ownershipPercentage || 100,
    acquisitionDate: ownership?.acquisitionDate || new Date().toISOString().split('T')[0],
    acquisitionMethod: ownership?.acquisitionMethod || 'PURCHASE',
    documentNumber: ownership?.documentNumber || '',
    notes: ownership?.notes || '',
  });

  React.useEffect(() => {
    if (ownership) {
      setFormData({
        userId: ownership.user?.id || '',
        landParcelId: ownership.landParcel?.id || '',
        ownershipPercentage: ownership.ownershipPercentage || 100,
        acquisitionDate: ownership.acquisitionDate || new Date().toISOString().split('T')[0],
        acquisitionMethod: ownership.acquisitionMethod || 'PURCHASE',
        documentNumber: ownership.documentNumber || '',
        notes: ownership.notes || '',
      });
    }
  }, [ownership]);

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
          {ownership ? 'Edit Ownership' : 'Create New Ownership'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Owner</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Owner</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
              <option value="3">Alice Johnson</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Land Parcel</label>
            <select
              name="landParcelId"
              value={formData.landParcelId}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Land Parcel</option>
              <option value="1">LP001 - Kigali</option>
              <option value="2">LP002 - Huye</option>
              <option value="3">LP003 - Musanze</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ownership Percentage</label>
            <input
              type="number"
              name="ownershipPercentage"
              value={formData.ownershipPercentage}
              onChange={handleChange}
              className="input"
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Acquisition Date</label>
            <input
              type="date"
              name="acquisitionDate"
              value={formData.acquisitionDate}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Acquisition Method</label>
            <select
              name="acquisitionMethod"
              value={formData.acquisitionMethod}
              onChange={handleChange}
              className="input"
            >
              <option value="PURCHASE">Purchase</option>
              <option value="INHERITANCE">Inheritance</option>
              <option value="GIFT">Gift</option>
              <option value="GOVERNMENT_ALLOCATION">Government Allocation</option>
              <option value="COURT_ORDER">Court Order</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Document Number</label>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              className="input"
              placeholder="Title deed or certificate number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Additional notes..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {ownership ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Ownerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageOwnerships = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const [ownerships, setOwnerships] = useState([
    {
      id: 1,
      landParcel: { id: 1, parcelNumber: 'LP001', district: 'Kigali', sector: 'Nyarugenge', area: 500 },
      user: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-01-15',
      acquisitionMethod: 'PURCHASE',
      documentNumber: 'TD-2024-001',
      status: 'ACTIVE',
      notes: 'Primary residence ownership'
    },
    {
      id: 2,
      landParcel: { id: 2, parcelNumber: 'LP002', district: 'Huye', sector: 'Tumba', area: 750 },
      user: { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-02-20',
      acquisitionMethod: 'INHERITANCE',
      documentNumber: 'TD-2024-002',
      status: 'ACTIVE',
      notes: 'Inherited from family'
    },
    {
      id: 3,
      landParcel: { id: 3, parcelNumber: 'LP003', district: 'Musanze', sector: 'Muhoza', area: 1200 },
      user: { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' },
      ownershipPercentage: 60,
      acquisitionDate: '2024-03-10',
      acquisitionMethod: 'PURCHASE',
      documentNumber: 'TD-2024-003',
      status: 'ACTIVE',
      notes: 'Shared ownership with spouse'
    },
    {
      id: 4,
      landParcel: { id: 3, parcelNumber: 'LP003', district: 'Musanze', sector: 'Muhoza', area: 1200 },
      user: { id: 4, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
      ownershipPercentage: 40,
      acquisitionDate: '2024-03-10',
      acquisitionMethod: 'PURCHASE',
      documentNumber: 'TD-2024-003',
      status: 'ACTIVE',
      notes: 'Shared ownership with spouse'
    },
    {
      id: 5,
      landParcel: { id: 4, parcelNumber: 'LP004', district: 'Rubavu', sector: 'Gisenyi', area: 300 },
      user: { id: 5, firstName: 'Carol', lastName: 'Davis', email: 'carol@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-01-05',
      acquisitionMethod: 'GOVERNMENT_ALLOCATION',
      documentNumber: 'GA-2024-001',
      status: 'TRANSFERRED',
      notes: 'Government housing program'
    },
    {
      id: 6,
      landParcel: { id: 5, parcelNumber: 'LP005', district: 'Nyagatare', sector: 'Karangazi', area: 2000 },
      user: { id: 6, firstName: 'David', lastName: 'Miller', email: 'david@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-02-28',
      acquisitionMethod: 'COURT_ORDER',
      documentNumber: 'CO-2024-001',
      status: 'DISPUTED',
      notes: 'Ownership under legal dispute'
    }
  ]);

  // Filter ownerships
  const filteredOwnerships = ownerships.filter((ownership) => {
    const matchesSearch =
      ownership.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownership.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownership.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownership.landParcel.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownership.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? ownership.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOwnerships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOwnerships = filteredOwnerships.slice(startIndex, startIndex + itemsPerPage);

  // Action handlers
  const handleSaveOwnership = (ownershipData) => {
    if (selectedOwnership) {
      setOwnerships((prev) =>
        prev.map((o) => (o.id === selectedOwnership.id ? { ...o, ...ownershipData } : o))
      );
    } else {
      setOwnerships((prev) => [
        ...prev,
        {
          ...ownershipData,
          id: prev.length + 1,
          status: 'ACTIVE',
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleEditOwnership = (ownership) => {
    setSelectedOwnership(ownership);
    setIsModalOpen(true);
  };

  const handleDeleteOwnership = (ownershipId) => {
    if (window.confirm('Are you sure you want to delete this ownership record?')) {
      setOwnerships((prev) => prev.filter((o) => o.id !== ownershipId));
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'TRANSFERRED':
        return 'bg-blue-100 text-blue-800';
      case 'DISPUTED':
        return 'bg-red-100 text-red-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAcquisitionMethodBadge = (method) => {
    const methodClasses = {
      PURCHASE: 'bg-blue-100 text-blue-800',
      INHERITANCE: 'bg-purple-100 text-purple-800',
      GIFT: 'bg-pink-100 text-pink-800',
      GOVERNMENT_ALLOCATION: 'bg-green-100 text-green-800',
      COURT_ORDER: 'bg-orange-100 text-orange-800',
      OTHER: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${methodClasses[method] || 'bg-gray-100 text-gray-800'}`}>
        {method.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div>
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Ownerships</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage property ownership records and transfers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {canManageOwnerships && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedOwnership(null);
                setIsModalOpen(true);
              }}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Ownership
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search by owner name, parcel number, document number..."
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
            <option value="ACTIVE">Active</option>
            <option value="TRANSFERRED">Transferred</option>
            <option value="DISPUTED">Disputed</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Ownerships table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Land Parcel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ownership %
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acquisition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {canManageOwnerships && (
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedOwnerships.map((ownership) => (
                    <tr key={ownership.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-700">
                                {ownership.user.firstName[0]}{ownership.user.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {ownership.user.firstName} {ownership.user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{ownership.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {ownership.landParcel.parcelNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ownership.landParcel.district} - {ownership.landParcel.area}m²
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ownership.ownershipPercentage}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(ownership.acquisitionDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getAcquisitionMethodBadge(ownership.acquisitionMethod)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ownership.documentNumber}</div>
                        {ownership.notes && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{ownership.notes}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(ownership.status)}`}>
                          {ownership.status}
                        </span>
                      </td>
                      {canManageOwnerships && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" title="View Details">
                              <EyeIcon className="h-4 w-4 inline" />
                            </button>
                            <button
                              onClick={() => handleEditOwnership(ownership)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4 inline" />
                            </button>
                            <button
                              onClick={() => handleDeleteOwnership(ownership.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4 inline" />
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOwnerships.length)} of{' '}
            {filteredOwnerships.length} ownerships
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

      <OwnershipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ownership={selectedOwnership}
        onSave={handleSaveOwnership}
      />
    </div>
  );
}

export default Ownerships;
