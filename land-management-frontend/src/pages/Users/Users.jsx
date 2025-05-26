import { useState, useEffect } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

// Modal Component
const UserModal = ({ isOpen, onClose, user = null, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nationalId: '',
    address: '',
    role: 'CITIZEN',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        nationalId: user.nationalId || '',
        address: user.address || '',
        role: user.role || 'CITIZEN',
      });
    }
  }, [user]);

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
          {user ? 'Edit User' : 'Add New User'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="text-sm">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <input name="email" value={formData.email} onChange={handleChange} className="input" required placeholder="Email" />
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input" required placeholder="Phone Number" />
          <input name="nationalId" value={formData.nationalId} onChange={handleChange} className="input" required placeholder="National ID" />
          <input name="address" value={formData.address} onChange={handleChange} className="input" required placeholder="Address" />
          <select name="role" value={formData.role} onChange={handleChange} className="input">
            <option value="CITIZEN">Citizen</option>
            <option value="LAND_OFFICER">Land Officer</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{user ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Users Component
const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const canManageUsers = currentUser.role === 'ADMIN';

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+250 788 123 456',
      nationalId: '1234567890123456',
      role: 'CITIZEN',
      status: 'ACTIVE',
      createdAt: '2024-01-15',
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...userData } : u))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...userData, id: prev.length + 1, status: 'ACTIVE', createdAt: new Date().toISOString() },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Delete this user?')) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Users</h1>
          <p className="text-sm text-gray-600">Manage users and roles</p>
        </div>
        {canManageUsers && (
          <button className="btn btn-primary" onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}>
            <PlusIcon className="h-5 w-5 inline-block mr-1" /> Add User
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1">
          <input
            className="input pl-10"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-2 left-3 h-5 w-5 text-gray-400" />
        </div>
        <select className="input" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="LAND_OFFICER">Land Officer</option>
          <option value="CITIZEN">Citizen</option>
        </select>
        <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Created</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900">
                  <PencilIcon className="h-5 w-5 inline" />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                  <TrashIcon className="h-5 w-5 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default Users;
