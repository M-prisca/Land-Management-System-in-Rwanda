import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

function Ownerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageOwnerships = ['ADMIN', 'LAND_OFFICER'].includes(currentUser.role);

  // Mock data for now
  const mockOwnerships = [
    {
      id: 1,
      landParcel: { parcelNumber: 'LP001', district: 'Kigali', area: 500 },
      user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-01-15',
      status: 'ACTIVE'
    },
    {
      id: 2,
      landParcel: { parcelNumber: 'LP002', district: 'Huye', area: 750 },
      user: { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
      ownershipPercentage: 100,
      acquisitionDate: '2024-02-20',
      status: 'ACTIVE'
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'TRANSFERRED':
        return 'bg-blue-100 text-blue-800';
      case 'DISPUTED':
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
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Ownership
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search by owner name, parcel number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                      Acquisition Date
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
                  {mockOwnerships.map((ownership) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(ownership.acquisitionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(ownership.status)}`}>
                          {ownership.status}
                        </span>
                      </td>
                      {canManageOwnerships && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">
                            <PencilIcon className="h-4 w-4 inline" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
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
      </div>
    </div>
  );
}

export default Ownerships;
