import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || 'John',
    lastName: currentUser.lastName || 'Doe',
    email: currentUser.email || 'john.doe@example.com',
    phoneNumber: currentUser.phoneNumber || '+250 788 123 456',
    nationalId: currentUser.nationalId || '1234567890123456',
    address: currentUser.address || 'Kigali, Rwanda',
    role: currentUser.role || 'CITIZEN'
  });

  const handleSave = () => {
    // Update localStorage with new data
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'LAND_OFFICER':
        return 'bg-blue-100 text-blue-800';
      case 'CITIZEN':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-600">
              Update your account information and preferences.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserCircleIcon className="h-12 w-12 text-gray-500" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(formData.role)}`}>
                    {formData.role?.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    National ID
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.role?.replace('_', ' ')}
                    disabled={true}
                  />
                  <p className="mt-1 text-sm text-gray-500">Role cannot be changed</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Account Created
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      January 2024
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Last Login
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Today
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profile Status
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Active
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
