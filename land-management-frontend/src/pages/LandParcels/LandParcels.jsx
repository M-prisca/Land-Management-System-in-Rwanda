import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, MapIcon } from '@heroicons/react/24/outline';

// Land Parcel Form Modal Component
const LandParcelModal = ({ isOpen, onClose, parcel = null, onSave }) => {
  const [formData, setFormData] = useState({
    parcelNumber: parcel?.parcelNumber || '',
    district: parcel?.district || '',
    sector: parcel?.sector || '',
    cell: parcel?.cell || '',
    village: parcel?.village || '',
    area: parcel?.area || '',
    landUse: parcel?.landUse || 'RESIDENTIAL',
    status: parcel?.status || 'AVAILABLE',
    coordinates: parcel?.coordinates || '',
    description: parcel?.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {parcel ? 'Edit Land Parcel' : 'Add New Land Parcel'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parcel Number</label>
              <input
                type="text"
                className="input"
                value={formData.parcelNumber}
                onChange={(e) => setFormData({...formData, parcelNumber: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  type="text"
                  className="input"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sector</label>
                <input
                  type="text"
                  className="input"
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cell</label>
                <input
                  type="text"
                  className="input"
                  value={formData.cell}
                  onChange={(e) => setFormData({...formData, cell: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Village</label>
                <input
                  type="text"
                  className="input"
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Area (m²)</label>
              <input
                type="number"
                className="input"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Land Use</label>
              <select
                className="input"
                value={formData.landUse}
                onChange={(e) => setFormData({...formData, landUse: e.target.value})}
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="AGRICULTURAL">Agricultural</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="RECREATIONAL">Recreational</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="input"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="AVAILABLE">Available</option>
                <option value="OWNED">Owned</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="DISPUTED">Disputed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="input"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {parcel ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function LandParcels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [landUseFilter, setLandUseFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageParcels = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for land parcels
  const mockParcels = [
    {
      id: 1,
      parcelNumber: 'LP001',
      district: 'Kigali',
      sector: 'Nyarugenge',
      cell: 'Kimisagara',
      village: 'Ubumwe',
      area: 500,
      landUse: 'RESIDENTIAL',
      status: 'OWNED',
      currentOwner: 'John Doe',
      description: 'Residential plot in urban area'
    },
    {
      id: 2,
      parcelNumber: 'LP002',
      district: 'Huye',
      sector: 'Tumba',
      cell: 'Cyarwa',
      village: 'Karama',
      area: 1200,
      landUse: 'COMMERCIAL',
      status: 'AVAILABLE',
      currentOwner: null,
      description: 'Commercial plot near main road'
    },
    {
      id: 3,
      parcelNumber: 'LP003',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Cyuve',
      village: 'Busogo',
      area: 2500,
      landUse: 'AGRICULTURAL',
      status: 'UNDER_REVIEW',
      currentOwner: 'Jane Smith',
      description: 'Agricultural land for farming'
    },
    {
      id: 4,
      parcelNumber: 'LP004',
      district: 'Rubavu',
      sector: 'Gisenyi',
      cell: 'Nyundo',
      village: 'Pfunda',
      area: 800,
      landUse: 'RESIDENTIAL',
      status: 'DISPUTED',
      currentOwner: 'Alice Johnson',
      description: 'Residential plot with lake view'
    },
    {
      id: 5,
      parcelNumber: 'LP005',
      district: 'Nyagatare',
      sector: 'Karangazi',
      cell: 'Kinyami',
      village: 'Rwempasha',
      area: 5000,
      landUse: 'INDUSTRIAL',
      status: 'AVAILABLE',
      currentOwner: null,
      description: 'Industrial zone for manufacturing'
    }
  ];

  // Filter parcels based on search and filters
  const filteredParcels = mockParcels.filter(parcel => {
    const matchesSearch = !searchTerm ||
      parcel.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (parcel.currentOwner && parcel.currentOwner.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = !statusFilter || parcel.status === statusFilter;
    const matchesLandUse = !landUseFilter || parcel.landUse === landUseFilter;

    return matchesSearch && matchesStatus && matchesLandUse;
  });

  // Pagination
  const totalElements = filteredParcels.length;
  const totalPages = Math.ceil(totalElements / parcelsPerPage);
  const startIndex = (currentPage - 1) * parcelsPerPage;
  const parcels = filteredParcels.slice(startIndex, startIndex + parcelsPerPage);

  const isLoading = false;
  const error = null;

  const handleSaveParcel = (parcelData) => {
    console.log('Save parcel:', parcelData);
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleEditParcel = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleDeleteParcel = (parcelId) => {
    if (window.confirm('Are you sure you want to delete this land parcel?')) {
      console.log('Delete parcel:', parcelId);
    }
  };

  const handleAddParcel = () => {
    setSelectedParcel(null);
    setIsModalOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'OWNED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'DISPUTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLandUseBadgeColor = (landUse) => {
    switch (landUse) {
      case 'RESIDENTIAL':
        return 'bg-blue-100 text-blue-800';
      case 'COMMERCIAL':
        return 'bg-purple-100 text-purple-800';
      case 'AGRICULTURAL':
        return 'bg-green-100 text-green-800';
      case 'INDUSTRIAL':
        return 'bg-gray-100 text-gray-800';
      case 'RECREATIONAL':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Land Parcels</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage land parcel records, their details, and ownership status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {canManageParcels && (
            <button
              type="button"
              onClick={handleAddParcel}
              className="btn btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Land Parcel
            </button>
          )}
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
              placeholder="Search by parcel number, location, or owner..."
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
            <option value="AVAILABLE">Available</option>
            <option value="OWNED">Owned</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="DISPUTED">Disputed</option>
          </select>
          <select
            className="input"
            value={landUseFilter}
            onChange={(e) => setLandUseFilter(e.target.value)}
          >
            <option value="">All Land Use</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="AGRICULTURAL">Agricultural</option>
            <option value="INDUSTRIAL">Industrial</option>
            <option value="RECREATIONAL">Recreational</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-500">Loading land parcels...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">
            Error loading land parcels: {error.message}
          </p>
        </div>
      )}

      {/* Land Parcels table */}
      {!isLoading && !error && (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parcel Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Area & Use
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      {canManageParcels && (
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parcels.map((parcel) => (
                      <tr key={parcel.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <MapIcon className="h-5 w-5 text-green-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {parcel.parcelNumber}
                              </div>
                              <div className="text-sm text-gray-500">ID: {parcel.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {parcel.district}, {parcel.sector}
                          </div>
                          <div className="text-sm text-gray-500">
                            {parcel.cell}, {parcel.village}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {parcel.area?.toLocaleString()} m²
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLandUseBadgeColor(parcel.landUse)}`}>
                            {parcel.landUse?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(parcel.status)}`}>
                            {parcel.status?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {parcel.currentOwner || 'No Owner'}
                        </td>
                        {canManageParcels && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditParcel(parcel)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <PencilIcon className="h-4 w-4 inline" />
                            </button>
                            <button
                              onClick={() => handleDeleteParcel(parcel.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-4 w-4 inline" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((currentPage - 1) * parcelsPerPage) + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * parcelsPerPage, totalElements)}
                    </span>{' '}
                    of <span className="font-medium">{totalElements}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Land Parcel Modal */}
      <LandParcelModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedParcel(null);
        }}
        parcel={selectedParcel}
        onSave={handleSaveParcel}
      />
    </div>
  );
}

export default LandParcels;
