import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  UsersIcon,
  MapIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from '@heroicons/react/24/outline';
import { usersAPI, landParcelsAPI, requestsAPI, documentsAPI, ownershipsAPI } from '../../services/api';

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

// Mock data - replace with actual API calls
const mockStats = {
  totalUsers: 1250,
  totalLandParcels: 3420,
  totalOwnerships: 2890,
  pendingRequests: 45,
  totalDocuments: 5670,
  userGrowth: 12.5,
  parcelGrowth: 8.3,
  requestGrowth: -5.2,
};

const mockRecentActivities = [
  {
    id: 1,
    type: 'user_registered',
    message: 'New user John Doe registered',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'request_submitted',
    message: 'Land registration request submitted for LP001',
    time: '15 minutes ago',
  },
  {
    id: 3,
    type: 'document_verified',
    message: 'Title deed verified for LP002',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'ownership_transferred',
    message: 'Ownership transferred for LP003',
    time: '2 hours ago',
  },
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'CITIZEN';

  // Fetch dashboard data from API
  const { data: usersStats } = useQuery({
    queryKey: ['users-stats'],
    queryFn: () => usersAPI.getStats(),
    select: (response) => response.data,
  });

  const { data: parcelsStats } = useQuery({
    queryKey: ['parcels-stats'],
    queryFn: () => landParcelsAPI.getStats(),
    select: (response) => response.data,
  });

  const { data: requestsStats } = useQuery({
    queryKey: ['requests-stats'],
    queryFn: () => requestsAPI.getStats(),
    select: (response) => response.data,
  });

  const { data: documentsStats } = useQuery({
    queryKey: ['documents-stats'],
    queryFn: () => documentsAPI.getStats(),
    select: (response) => response.data,
  });

  const { data: ownershipsStats } = useQuery({
    queryKey: ['ownerships-stats'],
    queryFn: () => ownershipsAPI.getStats(),
    select: (response) => response.data,
  });

  // Mock data for charts (replace with real API data)
  const transfersOverTime = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Land Transfers',
        data: [12, 19, 8, 15, 22, 18],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const ownershipByDistrict = {
    labels: ['Kigali', 'Huye', 'Musanze', 'Rubavu', 'Nyagatare'],
    datasets: [
      {
        data: [300, 150, 120, 80, 90],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
        ],
      },
    ],
  };

  const requestsByStatus = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Requests',
        data: [45, 120, 15],
        backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],
      },
    ],
  };

  const stats = [
    {
      name: 'Total Users',
      value: usersStats?.total || 0,
      icon: UsersIcon,
      change: 12.5,
      changeType: 'increase',
      visible: ['ADMIN', 'LAND_OFFICER'].includes(userRole),
    },
    {
      name: 'Land Parcels',
      value: parcelsStats?.total || 0,
      icon: MapIcon,
      change: 8.3,
      changeType: 'increase',
      visible: true,
    },
    {
      name: 'Active Ownerships',
      value: ownershipsStats?.total || 0,
      icon: BuildingOfficeIcon,
      change: 15.2,
      changeType: 'increase',
      visible: true,
    },
    {
      name: 'Pending Requests',
      value: requestsStats?.pending || 0,
      icon: ClipboardDocumentListIcon,
      change: -5.2,
      changeType: 'decrease',
      visible: ['ADMIN', 'LAND_OFFICER'].includes(userRole),
    },
    {
      name: 'Documents',
      value: documentsStats?.total || 0,
      icon: DocumentTextIcon,
      change: 22.1,
      changeType: 'increase',
      visible: ['ADMIN', 'LAND_OFFICER'].includes(userRole),
    },
  ].filter(stat => stat.visible);

  return (
    <div>
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your land management system.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-primary-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.changeType === 'increase' ? (
                    <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                  )}
                  <span className="sr-only">
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {Math.abs(item.change)}%
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Transfers Over Time Chart */}
        {['ADMIN', 'LAND_OFFICER'].includes(userRole) && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Land Transfers Over Time
            </h3>
            <div className="h-64">
              <Line
                data={transfersOverTime}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Ownership by District Pie Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Parcel Ownership by District
          </h3>
          <div className="h-64">
            <Pie
              data={ownershipByDistrict}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Requests by Status Chart */}
        {['ADMIN', 'LAND_OFFICER'].includes(userRole) && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Requests by Status
            </h3>
            <div className="h-64">
              <Bar
                data={requestsByStatus}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {mockRecentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== mockRecentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                          <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{activity.message}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow hover:shadow-md transition-shadow">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-600 ring-4 ring-white">
                <UsersIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Add New User
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Register a new user in the system
              </p>
            </div>
          </button>

          <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow hover:shadow-md transition-shadow">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-secondary-50 text-secondary-600 ring-4 ring-white">
                <MapIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Register Land Parcel
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add a new land parcel to the system
              </p>
            </div>
          </button>

          <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow hover:shadow-md transition-shadow">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-600 ring-4 ring-white">
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Process Requests
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Review and process pending requests
              </p>
            </div>
          </button>

          <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow hover:shadow-md transition-shadow">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-600 ring-4 ring-white">
                <DocumentTextIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Upload Documents
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Upload and manage documents
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
