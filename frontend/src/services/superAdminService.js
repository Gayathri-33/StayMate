import api from "./api";

const superadminService = {
  getDashboard: () => api.get("/superadmin/dashboard"),
  getPendingAdmins: () => api.get("/superadmin/admins/pending"),
  getApprovedAdmins: () => api.get("/superadmin/admins/approved"),
  getRejectedAdmins: () => api.get("/superadmin/admins/rejected"),
  approveAdmin: (id) => api.put(`/superadmin/admins/approve/${id}`),
  rejectAdmin: (id) => api.put(`/superadmin/admins/reject/${id}`),
  // Add this line inside the superadminService object:
updateAdminStatus: (id, status) => api.put(`/superadmin/admins/status/${id}/${status}`),
  getPendingHostels: () => api.get("/superadmin/hostels/pending"),
  getApprovedHostels: () => api.get("/superadmin/hostels/approved"),
  approveHostel: (id) => api.put(`/superadmin/hostels/approve/${id}`),
  rejectHostel: (id) => api.put(`/superadmin/hostels/reject/${id}`),
  
  getNotifications: () => api.get("/superadmin/notifications"),
  markNotificationRead: (id) => api.put(`/superadmin/notifications/read/${id}`),
};
export default superadminService;