import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dashboard Components for different roles
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Mock data for charts
  const monthlyRegistrationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 78, 89, 95, 102],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const landParcelStatusData = {
    labels: ['Available', 'Occupied', 'Under Review', 'Disputed'],
    datasets: [
      {
        data: [1250, 1890, 234, 54],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const requestTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Land Requests',
        data: [12, 19, 15, 25],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Document Submissions',
        data: [8, 15, 12, 18],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Business Summary Data
  const businessMetrics = {
    totalRevenue: 'RWF 45,230,000',
    monthlyGrowth: '+12.5%',
    activeUsers: '1,247',
    completedTransactions: '3,456',
    averageProcessingTime: '3.2 days',
    customerSatisfaction: '94.8%'
  };

  const recentActivities = [
    { id: 1, action: 'New land parcel registered', user: 'John Doe', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Document verification completed', user: 'Jane Smith', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'Land transfer approved', user: 'Mike Johnson', time: '6 hours ago', type: 'success' },
    { id: 4, action: 'Dispute case opened', user: 'Sarah Wilson', time: '8 hours ago', type: 'warning' },
    { id: 5, action: 'System backup completed', user: 'System', time: '12 hours ago', type: 'info' },
  ];

  if (activeSection === 'users') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Users</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add New User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CITIZEN</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LAND_OFFICER</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (activeSection === 'parcels') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Land Parcel Management</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Land Parcels</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Add New Parcel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (m²)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LP001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kigali, Gasabo</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,200</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Occupied</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LP002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kigali, Nyarugenge</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">800</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (activeSection === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">System Name</label>
                  <input type="text" value="Land Management System" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Language</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    <option>English</option>
                    <option>Kinyarwanda</option>
                    <option>French</option>
                  </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Enabled</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Password Expiry</span>
                  <span className="text-sm text-gray-500">90 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Session Timeout</span>
                  <span className="text-sm text-gray-500">30 minutes</span>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Update Security
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Dashboard View with Charts and Business Summary
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.firstName} {user.lastName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Business Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{businessMetrics.activeUsers}</dd>
                      <dd className="text-sm text-green-600">{businessMetrics.monthlyGrowth} from last month</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">🏞️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Land Parcels</dt>
                      <dd className="text-2xl font-semibold text-gray-900">3,428</dd>
                      <dd className="text-sm text-blue-600">1,250 available</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{businessMetrics.totalRevenue}</dd>
                      <dd className="text-sm text-green-600">+15.3% this quarter</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">⭐</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Satisfaction</dt>
                      <dd className="text-2xl font-semibold text-gray-900">{businessMetrics.customerSatisfaction}</dd>
                      <dd className="text-sm text-green-600">+2.1% improvement</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly User Registrations Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly User Registrations</h3>
              <div className="h-64">
                <Bar data={monthlyRegistrationsData} options={chartOptions} />
              </div>
            </div>

            {/* Land Parcel Status Distribution */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Land Parcel Status Distribution</h3>
              <div className="h-64">
                <Doughnut data={landParcelStatusData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Request Trends and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Request Trends Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Request Trends</h3>
              <div className="h-64">
                <Line data={requestTrendsData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{businessMetrics.completedTransactions}</div>
                <div className="text-sm text-gray-500">Completed Transactions</div>
                <div className="text-xs text-green-600 mt-1">+8.2% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{businessMetrics.averageProcessingTime}</div>
                <div className="text-sm text-gray-500">Average Processing Time</div>
                <div className="text-xs text-green-600 mt-1">-0.5 days improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">127</div>
                <div className="text-sm text-gray-500">Pending Requests</div>
                <div className="text-xs text-yellow-600 mt-1">Requires attention</div>
              </div>
            </div>
          </div>

          {/* Working Action Buttons */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveSection('users')}
                className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage Users
              </button>
              <button
                onClick={() => setActiveSection('parcels')}
                className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Manage Land Parcels
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className="bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 transition-colors"
              >
                System Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const OfficerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeSection, setActiveSection] = useState('dashboard');

  // All state variables for different sections
  const [requestFilter, setRequestFilter] = useState('All Requests');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [requests, setRequests] = useState([
    { id: 'LR001', applicant: 'John Doe', type: 'Land Transfer', location: 'Kigali, Gasabo', priority: 'High', date: '2024-01-15', status: 'Pending', description: 'Request to transfer land ownership from John Doe to Mary Doe for residential purposes.' },
    { id: 'LR002', applicant: 'Jane Smith', type: 'New Registration', location: 'Kigali, Nyarugenge', priority: 'Medium', date: '2024-01-14', status: 'Pending', description: 'New land registration for commercial development project.' },
    { id: 'LR003', applicant: 'Mike Johnson', type: 'Ownership Change', location: 'Kigali, Kicukiro', priority: 'Low', date: '2024-01-13', status: 'Pending', description: 'Change of ownership due to inheritance.' }
  ]);

  // Document verification state
  const [documentFilter, setDocumentFilter] = useState('All Documents');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 'DOC001', type: 'Land Title', uploader: 'John Doe', date: '2024-01-15', status: 'Pending', description: 'Original land title document for Property LP001', fileUrl: '#' },
    { id: 'DOC002', type: 'Transfer Deed', uploader: 'Jane Smith', date: '2024-01-14', status: 'Under Review', description: 'Transfer deed for commercial property', fileUrl: '#' },
    { id: 'DOC003', type: 'Survey Report', uploader: 'Mike Johnson', date: '2024-01-13', status: 'Pending', description: 'Professional survey report with measurements', fileUrl: '#' },
    { id: 'DOC004', type: 'Land Title', uploader: 'Sarah Wilson', date: '2024-01-12', status: 'Pending', description: 'Land title for residential property', fileUrl: '#' }
  ]);

  // Land records state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [landRecords, setLandRecords] = useState([
    { id: 'LP001', location: 'Kigali, Gasabo', owner: 'John Doe', area: '1,200', lastUpdated: '2024-01-10', status: 'Active', landUse: 'Residential', value: 'RWF 25M' },
    { id: 'LP002', location: 'Kigali, Nyarugenge', owner: 'Jane Smith', area: '800', lastUpdated: '2024-01-08', status: 'Active', landUse: 'Commercial', value: 'RWF 18M' },
    { id: 'LP003', location: 'Kigali, Kicukiro', owner: 'Mike Johnson', area: '1,500', lastUpdated: '2024-01-05', status: 'Pending Transfer', landUse: 'Agricultural', value: 'RWF 32M' }
  ]);

  // Reports state
  const [customReportType, setCustomReportType] = useState('Activity Report');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportFormat, setReportFormat] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Officer-specific chart data
  const weeklyReviewsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reviews Completed',
        data: [12, 15, 8, 20, 18, 5, 3],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const documentStatusData = {
    labels: ['Verified', 'Pending', 'Rejected', 'Under Review'],
    datasets: [
      {
        data: [145, 23, 8, 15],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const requestTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Land Requests',
        data: [8, 12, 15, 18],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Document Verifications',
        data: [15, 18, 12, 22],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Helper functions for requests
  const filteredRequests = requests.filter(request => {
    if (requestFilter === 'All Requests') return true;
    return request.priority === requestFilter.replace(' Priority', '');
  });

  const handleApprove = (request) => {
    setRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'Approved' } : r));
    alert(`Request ${request.id} has been approved successfully!`);
  };

  const handleReject = (request) => {
    setRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'Rejected' } : r));
    alert(`Request ${request.id} has been rejected.`);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setModalType('details');
    setShowModal(true);
  };

  // Helper functions for documents
  const filteredDocuments = documents.filter(doc => {
    if (documentFilter === 'All Documents') return true;
    return doc.type === documentFilter.replace('s', '');
  });

  const handleViewDoc = (document) => {
    setSelectedDocument(document);
    setShowDocModal(true);
  };

  const handleVerify = (document) => {
    setDocuments(prev => prev.map(d => d.id === document.id ? { ...d, status: 'Verified' } : d));
    alert(`Document ${document.id} has been verified successfully!`);
  };

  const handleRejectDoc = (document) => {
    setDocuments(prev => prev.map(d => d.id === document.id ? { ...d, status: 'Rejected' } : d));
    alert(`Document ${document.id} has been rejected.`);
  };

  // Helper functions for land records
  const filteredRecords = landRecords.filter(record =>
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setModalType('edit');
    setShowRecordModal(true);
  };

  const handleViewHistory = (record) => {
    setSelectedRecord(record);
    setModalType('history');
    setShowRecordModal(true);
  };

  const handleUpdateStatus = (record) => {
    setSelectedRecord(record);
    setModalType('status');
    setShowRecordModal(true);
  };

  const handleAddNew = () => {
    setShowAddModal(true);
  };

  // Helper functions for reports
  const generateQuickReport = async (reportType) => {
    setIsGenerating(true);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock report data based on type
    let reportData = {};
    switch(reportType) {
      case 'Monthly Activity Report':
        reportData = {
          title: 'Monthly Activity Report',
          period: 'January 2024',
          totalRequests: 45,
          approvedRequests: 32,
          rejectedRequests: 8,
          pendingRequests: 5,
          documentsVerified: 67,
          newRegistrations: 12
        };
        break;
      case 'Pending Requests Summary':
        reportData = {
          title: 'Pending Requests Summary',
          totalPending: 23,
          highPriority: 8,
          mediumPriority: 10,
          lowPriority: 5,
          averageWaitTime: '3.2 days'
        };
        break;
      case 'Land Parcel Status Report':
        reportData = {
          title: 'Land Parcel Status Report',
          totalParcels: 3428,
          activeParcels: 1890,
          availableParcels: 1250,
          underReview: 234,
          disputed: 54
        };
        break;
      case 'Document Verification Report':
        reportData = {
          title: 'Document Verification Report',
          totalDocuments: 191,
          verified: 145,
          pending: 23,
          rejected: 8,
          underReview: 15
        };
        break;
    }

    setIsGenerating(false);

    // Show report preview
    alert(`${reportType} Generated Successfully!\n\nReport Summary:\n${JSON.stringify(reportData, null, 2)}\n\nReport would be downloaded as PDF.`);
  };

  const generateCustomReport = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    setIsGenerating(true);

    // Simulate custom report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const customReportData = {
      type: customReportType,
      dateRange: `${startDate} to ${endDate}`,
      format: reportFormat,
      generatedAt: new Date().toISOString(),
      data: 'Custom report data would be generated based on selected criteria'
    };

    setIsGenerating(false);

    alert(`Custom ${customReportType} Generated Successfully!\n\nReport Details:\n${JSON.stringify(customReportData, null, 2)}\n\nReport would be downloaded as ${reportFormat}.`);
  };

  // Review Land Requests Section
  if (activeSection === 'requests') {

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Review Land Requests</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Pending Land Requests</h2>
              <div className="flex space-x-2">
                <select
                  value={requestFilter}
                  onChange={(e) => setRequestFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option>All Requests</option>
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.applicant}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' :
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="text-red-600 hover:text-red-900 mr-3"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Request Details Modal */}
          {showModal && selectedRequest && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Request Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Request ID</label>
                      <p className="text-sm text-gray-900">{selectedRequest.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Applicant</label>
                      <p className="text-sm text-gray-900">{selectedRequest.applicant}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <p className="text-sm text-gray-900">{selectedRequest.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedRequest.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <p className="text-sm text-gray-900">{selectedRequest.priority}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="text-sm text-gray-900">{selectedRequest.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <p className="text-sm text-gray-900">{selectedRequest.status}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Verify Documents Section
  if (activeSection === 'documents') {

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Document Verification</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Documents Pending Verification</h2>
              <div className="flex space-x-2">
                <select
                  value={documentFilter}
                  onChange={(e) => setDocumentFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>All Documents</option>
                  <option>Land Titles</option>
                  <option>Transfer Deeds</option>
                  <option>Survey Reports</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{document.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploader}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          document.status === 'Verified' ? 'bg-green-100 text-green-800' :
                          document.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          document.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {document.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDoc(document)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        {(document.status === 'Pending' || document.status === 'Under Review') && (
                          <>
                            <button
                              onClick={() => handleVerify(document)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleRejectDoc(document)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document View Modal */}
          {showDocModal && selectedDocument && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Document Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Document ID</label>
                      <p className="text-sm text-gray-900">{selectedDocument.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <p className="text-sm text-gray-900">{selectedDocument.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Uploader</label>
                      <p className="text-sm text-gray-900">{selectedDocument.uploader}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Date</label>
                      <p className="text-sm text-gray-900">{selectedDocument.date}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="text-sm text-gray-900">{selectedDocument.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <p className="text-sm text-gray-900">{selectedDocument.status}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Document Preview</label>
                      <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
                        <div className="text-gray-400">
                          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500">Document preview would appear here</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Download Document</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowDocModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Close
                    </button>
                    {(selectedDocument.status === 'Pending' || selectedDocument.status === 'Under Review') && (
                      <>
                        <button
                          onClick={() => {
                            handleVerify(selectedDocument);
                            setShowDocModal(false);
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => {
                            handleRejectDoc(selectedDocument);
                            setShowDocModal(false);
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Update Land Records Section
  if (activeSection === 'records') {

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Update Land Records</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Land Records Management</h2>
              <button
                onClick={handleAddNew}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Add New Record
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Parcel ID, Owner, or Location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (m²)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.owner}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'Active' ? 'bg-green-100 text-green-800' :
                          record.status === 'Pending Transfer' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.lastUpdated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewHistory(record)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View History
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(record)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Record Modal */}
          {showRecordModal && selectedRecord && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {modalType === 'edit' ? 'Edit Land Record' :
                     modalType === 'history' ? 'Record History' : 'Update Status'}
                  </h3>

                  {modalType === 'edit' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Parcel ID</label>
                        <input type="text" defaultValue={selectedRecord.id} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" defaultValue={selectedRecord.location} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Owner</label>
                        <input type="text" defaultValue={selectedRecord.owner} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Area (m²)</label>
                        <input type="text" defaultValue={selectedRecord.area} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                      </div>
                    </div>
                  )}

                  {modalType === 'history' && (
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="text-sm font-medium">2024-01-10</p>
                        <p className="text-sm text-gray-600">Record created by Land Officer</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="text-sm font-medium">2024-01-08</p>
                        <p className="text-sm text-gray-600">Ownership verified and approved</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="text-sm font-medium">2024-01-05</p>
                        <p className="text-sm text-gray-600">Initial documentation submitted</p>
                      </div>
                    </div>
                  )}

                  {modalType === 'status' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Status</label>
                        <p className="text-sm text-gray-900">{selectedRecord.status}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Status</label>
                        <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                          <option>Active</option>
                          <option>Pending Transfer</option>
                          <option>Under Review</option>
                          <option>Disputed</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Reason for Change</label>
                        <textarea rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Enter reason for status change..."></textarea>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowRecordModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    {modalType !== 'history' && (
                      <button
                        onClick={() => {
                          alert(`${modalType === 'edit' ? 'Record updated' : 'Status updated'} successfully!`);
                          setShowRecordModal(false);
                        }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                      >
                        {modalType === 'edit' ? 'Save Changes' : 'Update Status'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add New Record Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Land Record</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parcel ID</label>
                      <input type="text" placeholder="LP004" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input type="text" placeholder="Kigali, District" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Owner</label>
                      <input type="text" placeholder="Owner Name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Area (m²)</label>
                      <input type="number" placeholder="1000" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Land Use</label>
                      <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Agricultural</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert('New land record added successfully!');
                        setShowAddModal(false);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                    >
                      Add Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Generate Reports Section
  if (activeSection === 'reports') {

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Reports</h2>
              <div className="space-y-4">
                <button
                  onClick={() => generateQuickReport('Monthly Activity Report')}
                  disabled={isGenerating}
                  className="w-full bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📊 Monthly Activity Report
                </button>
                <button
                  onClick={() => generateQuickReport('Pending Requests Summary')}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📋 Pending Requests Summary
                </button>
                <button
                  onClick={() => generateQuickReport('Land Parcel Status Report')}
                  disabled={isGenerating}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🏞️ Land Parcel Status Report
                </button>
                <button
                  onClick={() => generateQuickReport('Document Verification Report')}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📄 Document Verification Report
                </button>
              </div>

              {isGenerating && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-blue-600">Generating report...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Custom Report Generator</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Type</label>
                  <select
                    value={customReportType}
                    onChange={(e) => setCustomReportType(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option>Activity Report</option>
                    <option>Performance Report</option>
                    <option>Status Summary</option>
                    <option>Financial Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Format</label>
                  <select
                    value={reportFormat}
                    onChange={(e) => setReportFormat(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                <button
                  onClick={generateCustomReport}
                  disabled={isGenerating}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Report Preview</h3>
                <div className="text-sm text-gray-600">
                  <p><strong>Type:</strong> {customReportType}</p>
                  <p><strong>Date Range:</strong> {startDate && endDate ? `${startDate} to ${endDate}` : 'Not selected'}</p>
                  <p><strong>Format:</strong> {reportFormat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Activity Report - Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Activity Report</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PDF</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                      <button className="text-green-600 hover:text-green-900">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Land Parcel Status Report</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Status Summary</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Excel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                      <button className="text-green-600 hover:text-green-900">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Officer Dashboard with Charts
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Land Officer Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.firstName} {user.lastName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">🏞️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Assigned Parcels</dt>
                      <dd className="text-2xl font-semibold text-gray-900">156</dd>
                      <dd className="text-sm text-green-600">+8 this week</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📋</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
                      <dd className="text-2xl font-semibold text-gray-900">23</dd>
                      <dd className="text-sm text-yellow-600">Requires attention</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed Today</dt>
                      <dd className="text-2xl font-semibold text-gray-900">8</dd>
                      <dd className="text-sm text-blue-600">Above average</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📄</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Documents Verified</dt>
                      <dd className="text-2xl font-semibold text-gray-900">145</dd>
                      <dd className="text-sm text-purple-600">This month</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Reviews Chart */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Review Activity</h3>
              <div className="h-64">
                <Bar data={weeklyReviewsData} options={chartOptions} />
              </div>
            </div>

            {/* Document Status Distribution */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Document Status Distribution</h3>
              <div className="h-64">
                <Doughnut data={documentStatusData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Request Trends */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Request & Verification Trends</h3>
            <div className="h-64">
              <Line data={requestTrendsData} options={chartOptions} />
            </div>
          </div>

          {/* Working Officer Action Buttons */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Officer Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveSection('requests')}
                className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Review Land Requests
              </button>
              <button
                onClick={() => setActiveSection('documents')}
                className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Verify Documents
              </button>
              <button
                onClick={() => setActiveSection('records')}
                className="bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 transition-colors"
              >
                Update Land Records
              </button>
              <button
                onClick={() => setActiveSection('reports')}
                className="bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 transition-colors"
              >
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const CitizenDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Citizen-specific chart data
  const myRequestsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'My Requests',
        data: [1, 0, 2, 1, 0, 1],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const requestStatusData = {
    labels: ['Approved', 'Pending', 'Under Review'],
    datasets: [
      {
        data: [3, 2, 1],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const propertyValueData = {
    labels: ['Property 1', 'Property 2', 'Property 3'],
    datasets: [
      {
        label: 'Estimated Value (RWF)',
        data: [25000000, 18000000, 32000000],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Submit Land Request Section
  if (activeSection === 'submit-request') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Submit Land Request</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">New Land Request Form</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Request Type</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                    <option>Land Transfer</option>
                    <option>New Registration</option>
                    <option>Ownership Change</option>
                    <option>Land Subdivision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property Location</label>
                <input type="text" placeholder="Enter property location" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property Area (m²)</label>
                <input type="number" placeholder="Enter area in square meters" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Request Description</label>
                <textarea rows="4" placeholder="Describe your request in detail..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400">
                  Save as Draft
                </button>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Upload Documents Section
  if (activeSection === 'upload-documents') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Upload New Document</h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Document Type</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Land Title</option>
                    <option>Transfer Deed</option>
                    <option>Survey Report</option>
                    <option>Identity Document</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Related Property</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Property 1 - Kigali, Gasabo</option>
                    <option>Property 2 - Kigali, Nyarugenge</option>
                    <option>Property 3 - Kigali, Kicukiro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Document File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="text-gray-400">
                        <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600">
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                          Choose file
                          <input type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea rows="3" placeholder="Brief description of the document..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Upload Document
                </button>
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">My Documents</h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Land Title - Property 1</h3>
                      <p className="text-sm text-gray-500">Uploaded: 2024-01-10</p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Verified</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Survey Report - Property 2</h3>
                      <p className="text-sm text-gray-500">Uploaded: 2024-01-08</p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Transfer Deed - Property 3</h3>
                      <p className="text-sm text-gray-500">Uploaded: 2024-01-05</p>
                    </div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Under Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // View My Properties Section
  if (activeSection === 'my-properties') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property 1 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Property 1</h3>
                <p className="text-sm text-gray-500">Kigali, Gasabo District</p>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Area</dt>
                    <dd className="text-gray-900">1,200 m²</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Status</dt>
                    <dd><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Land Use</dt>
                    <dd className="text-gray-900">Residential</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Value</dt>
                    <dd className="text-gray-900">RWF 25M</dd>
                  </div>
                </dl>
              </div>
              <div className="px-6 py-4">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Property 2</h3>
                <p className="text-sm text-gray-500">Kigali, Nyarugenge District</p>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Area</dt>
                    <dd className="text-gray-900">800 m²</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Status</dt>
                    <dd><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Land Use</dt>
                    <dd className="text-gray-900">Commercial</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Value</dt>
                    <dd className="text-gray-900">RWF 18M</dd>
                  </div>
                </dl>
              </div>
              <div className="px-6 py-4">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Property 3</h3>
                <p className="text-sm text-gray-500">Kigali, Kicukiro District</p>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Area</dt>
                    <dd className="text-gray-900">1,500 m²</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Status</dt>
                    <dd><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending Transfer</span></dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Land Use</dt>
                    <dd className="text-gray-900">Agricultural</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Value</dt>
                    <dd className="text-gray-900">RWF 32M</dd>
                  </div>
                </dl>
              </div>
              <div className="px-6 py-4">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Track Request Status Section
  if (activeSection === 'track-requests') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="text-green-600 hover:text-green-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Track Request Status</h1>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Land Requests</h2>
              <button
                onClick={() => setActiveSection('submit-request')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Submit New Request
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LR001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Land Transfer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Property 3</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Under Review</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-10</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">60% Complete</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LR002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New Registration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Property 4</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-08</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">25% Complete</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LR003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ownership Change</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Property 1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-05</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">100% Complete</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900">View Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Citizen Dashboard with Charts
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Citizen Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.firstName} {user.lastName}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">🏞️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">My Land Parcels</dt>
                      <dd className="text-2xl font-semibold text-gray-900">3</dd>
                      <dd className="text-sm text-green-600">Total value: RWF 75M</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📋</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Requests</dt>
                      <dd className="text-2xl font-semibold text-gray-900">2</dd>
                      <dd className="text-sm text-yellow-600">1 pending review</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">📄</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">My Documents</dt>
                      <dd className="text-2xl font-semibold text-gray-900">7</dd>
                      <dd className="text-sm text-blue-600">5 verified</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed Requests</dt>
                      <dd className="text-2xl font-semibold text-gray-900">5</dd>
                      <dd className="text-sm text-purple-600">This year</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* My Requests Over Time */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">My Requests Over Time</h3>
              <div className="h-64">
                <Bar data={myRequestsData} options={chartOptions} />
              </div>
            </div>

            {/* Request Status Distribution */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Request Status Distribution</h3>
              <div className="h-64">
                <Doughnut data={requestStatusData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Property Values Chart */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Property Values</h3>
            <div className="h-64">
              <Line data={propertyValueData} options={chartOptions} />
            </div>
          </div>

          {/* Working Citizen Action Buttons */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveSection('submit-request')}
                className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Submit Land Request
              </button>
              <button
                onClick={() => setActiveSection('upload-documents')}
                className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload Documents
              </button>
              <button
                onClick={() => setActiveSection('my-properties')}
                className="bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 transition-colors"
              >
                View My Properties
              </button>
              <button
                onClick={() => setActiveSection('track-requests')}
                className="bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 transition-colors"
              >
                Track Request Status
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Login Component
function LoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'CITIZEN'
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPin, setResetPin] = useState('');
  const [showPinVerification, setShowPinVerification] = useState(false);

  // Mock users for testing
  const mockUsers = [
    { email: 'admin@landmanagement.rw', password: 'admin123', role: 'ADMIN', firstName: 'Admin', lastName: 'User' },
    { email: 'officer@landmanagement.rw', password: 'officer123', role: 'LAND_OFFICER', firstName: 'Land', lastName: 'Officer' },
    { email: 'citizen@landmanagement.rw', password: 'citizen123', role: 'CITIZEN', firstName: 'John', lastName: 'Citizen' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user with matching credentials and role
      const user = mockUsers.find(u =>
        u.email === formData.email &&
        u.password === formData.password &&
        u.role === formData.role
      );

      if (user) {
        // Login successful
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case 'ADMIN':
            navigate('/admin-dashboard');
            break;
          case 'LAND_OFFICER':
            navigate('/officer-dashboard');
            break;
          case 'CITIZEN':
            navigate('/citizen-dashboard');
            break;
          default:
            navigate('/citizen-dashboard');
        }
      } else {
        setError('Invalid email, password, or role combination');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration functionality will be implemented soon!');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call to send email
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email exists in our mock users
      const userExists = mockUsers.find(u => u.email === forgotPasswordEmail);

      if (userExists) {
        // Generate a random 6-digit PIN
        const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();

        // Store the PIN temporarily (in real app, this would be sent via email)
        localStorage.setItem('resetPin', generatedPin);
        localStorage.setItem('resetEmail', forgotPasswordEmail);

        // Simulate sending email
        setSuccess(`Recovery PIN sent to ${forgotPasswordEmail}! For demo purposes, your PIN is: ${generatedPin}`);
        setShowPinVerification(true);
      } else {
        setError('Email address not found in our system');
      }
    } catch (err) {
      setError('Failed to send recovery email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePinVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const storedPin = localStorage.getItem('resetPin');
      const storedEmail = localStorage.getItem('resetEmail');

      if (resetPin === storedPin && forgotPasswordEmail === storedEmail) {
        // PIN verified successfully
        setSuccess('PIN verified! You can now reset your password.');

        // Clean up
        localStorage.removeItem('resetPin');
        localStorage.removeItem('resetEmail');

        // For demo, just show success and reset form
        setTimeout(() => {
          setShowForgotPassword(false);
          setShowPinVerification(false);
          setSuccess('');
          setForgotPasswordEmail('');
          setResetPin('');
          alert('Password reset successful! You can now login with your new password.');
        }, 2000);
      } else {
        setError('Invalid PIN. Please check and try again.');
      }
    } catch (err) {
      setError('PIN verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Land Management System Registration
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="CITIZEN">Citizen</option>
                  <option value="LAND_OFFICER">Land Officer</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Forgot Password Form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {showPinVerification ? 'Verify Recovery PIN' : 'Reset your password'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {showPinVerification
                ? 'Enter the 6-digit PIN sent to your email'
                : 'Enter your email address to receive a recovery PIN'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {!showPinVerification ? (
            <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="forgotEmail"
                  name="email"
                  type="email"
                  required
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError('');
                    setSuccess('');
                    setForgotPasswordEmail('');
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Recovery PIN'}
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handlePinVerification}>
              <div>
                <label htmlFor="resetPin" className="block text-sm font-medium text-gray-700">
                  Recovery PIN
                </label>
                <input
                  id="resetPin"
                  name="pin"
                  type="text"
                  required
                  maxLength="6"
                  value={resetPin}
                  onChange={(e) => setResetPin(e.target.value.replace(/\D/g, ''))}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest"
                  placeholder="000000"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter the 6-digit PIN sent to {forgotPasswordEmail}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinVerification(false);
                    setError('');
                    setSuccess('');
                    setResetPin('');
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify PIN'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Land Management System
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Login as
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="CITIZEN">Citizen</option>
                <option value="LAND_OFFICER">Land Officer</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Don't have an account? Register
            </button>
          </div>
        </form>

        {/* Test Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Test Credentials:</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@landmanagement.rw / admin123</p>
            <p><strong>Officer:</strong> officer@landmanagement.rw / officer123</p>
            <p><strong>Citizen:</strong> citizen@landmanagement.rw / citizen123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['LAND_OFFICER']}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen-dashboard"
          element={
            <ProtectedRoute allowedRoles={['CITIZEN']}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
