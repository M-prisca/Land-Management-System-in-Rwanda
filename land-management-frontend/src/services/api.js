import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  resendOTP: (email) => api.post('/auth/resend-otp', { email }),
};

export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getByEmail: (email) => api.get(`/users/email/${email}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  getActive: () => api.get('/users/active'),
  activate: (id) => api.patch(`/users/${id}/activate`),
  deactivate: (id) => api.patch(`/users/${id}/deactivate`),
  updateRole: (id, role) => api.patch(`/users/${id}/role/${role}`),
  getStats: () => api.get('/users/stats/total'),
  search: (query) => api.get(`/users/search?name=${query}`),
};

export const landParcelsAPI = {
  getAll: (params) => api.get('/land-parcels', { params }),
  getById: (id) => api.get(`/land-parcels/${id}`),
  create: (parcelData) => api.post('/land-parcels', parcelData),
  update: (id, parcelData) => api.put(`/land-parcels/${id}`, parcelData),
  delete: (id) => api.delete(`/land-parcels/${id}`),
  getByParcelNumber: (parcelNumber) => api.get(`/land-parcels/parcel-number/${parcelNumber}`),
  getByDistrict: (district) => api.get(`/land-parcels/district/${district}`),
  getAvailable: () => api.get('/land-parcels/available'),
  updateStatus: (id, status) => api.patch(`/land-parcels/${id}/status/${status}`),
  getStats: () => api.get('/land-parcels/stats/total'),
  search: (query) => api.get(`/land-parcels/search?location=${query}`),
};

export const ownershipsAPI = {
  getAll: (params) => api.get('/ownerships', { params }),
  getById: (id) => api.get(`/ownerships/${id}`),
  create: (ownershipData) => api.post('/ownerships', ownershipData),
  update: (id, ownershipData) => api.put(`/ownerships/${id}`, ownershipData),
  delete: (id) => api.delete(`/ownerships/${id}`),
  getByUser: (userId) => api.get(`/ownerships/user/${userId}`),
  getByLandParcel: (landParcelId) => api.get(`/ownerships/land-parcel/${landParcelId}`),
  transfer: (id, newUserId) => api.patch(`/ownerships/${id}/transfer/${newUserId}`),
  updateStatus: (id, status) => api.patch(`/ownerships/${id}/status/${status}`),
  getStats: () => api.get('/ownerships/stats/total'),
};

export const requestsAPI = {
  getAll: (params) => api.get('/requests', { params }),
  getById: (id) => api.get(`/requests/${id}`),
  create: (requestData) => api.post('/requests', requestData),
  update: (id, requestData) => api.put(`/requests/${id}`, requestData),
  delete: (id) => api.delete(`/requests/${id}`),
  getByUser: (userId) => api.get(`/requests/user/${userId}`),
  getPending: () => api.get('/requests/pending'),
  getPendingOrdered: () => api.get('/requests/pending/ordered'),
  approve: (id) => api.patch(`/requests/${id}/approve`),
  reject: (id) => api.patch(`/requests/${id}/reject`),
  assign: (id, officerId) => api.patch(`/requests/${id}/assign/${officerId}`),
  updatePriority: (id, priority) => api.patch(`/requests/${id}/priority/${priority}`),
  getStats: () => api.get('/requests/stats/total'),
};

export const documentsAPI = {
  getAll: (params) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  create: (documentData) => api.post('/documents', documentData),
  update: (id, documentData) => api.put(`/documents/${id}`, documentData),
  delete: (id) => api.delete(`/documents/${id}`),
  getByLandParcel: (landParcelId) => api.get(`/documents/land-parcel/${landParcelId}`),
  getByUser: (userId) => api.get(`/documents/user/${userId}`),
  verify: (documentId, verifierId) => api.patch(`/documents/${documentId}/verify/${verifierId}`),
  updateStatus: (id, status) => api.patch(`/documents/${id}/status/${status}`),
  getStats: () => api.get('/documents/stats/total'),
};

// Global search
export const searchAPI = {
  global: (query) => api.get(`/search?q=${query}`),
};

export default api;
