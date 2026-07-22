import api from "./api";

const adminService = {
  getDashboard: () => api.get("/admin/dashboard"),
  registerHostel: (formData) => api.post("/admin/hostels", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  getMyHostels: () => api.get("/admin/hostels/mine"),
  
  getRooms: (code) => api.get(`/admin/rooms/hostel/${code}`),
  addRoom: (code, data) => api.post(`/admin/rooms/hostel/${code}`, data),
  deleteRoom: (id) => api.delete(`/admin/rooms/${id}`),
  
  getBeds: (code) => api.get(`/admin/beds/hostel/${code}`),
  addBed: (roomId, bedNumber) => api.post(`/admin/beds/room/${roomId}`, { bedNumber }),
  deleteBed: (id) => api.delete(`/admin/beds/${id}`),
  
  getResidents: (hostelId) => api.get(`/admin/residents/hostel/${hostelId}`),
  blockResident: (id) => api.put(`/admin/residents/block/${id}`),
  unblockResident: (id) => api.put(`/admin/residents/unblock/${id}`),
  
  getComplaints: (hostelId, status) => api.get(`/admin/complaints/hostel/${hostelId}?status=${status || ''}`),
  resolveComplaint: (id) => api.put(`/admin/complaints/resolve/${id}`),
  
  getShiftRequests: (hostelId, status) => api.get(`/admin/room-shift/hostel/${hostelId}?status=${status || 'PENDING'}`),
  approveShift: (id) => api.put(`/admin/room-shift/approve/${id}`),
  rejectShift: (id) => api.put(`/admin/room-shift/reject/${id}`),
  
  getNotices: (hostelId) => api.get(`/admin/notices/hostel/${hostelId}`),
  addNotice: (hostelId, data) => api.post(`/admin/notices/hostel/${hostelId}`, data),
  
  getMessMenu: (hostelId) => api.get(`/admin/mess/hostel/${hostelId}`),
  addMessItem: (hostelId, data) => api.post(`/admin/mess/hostel/${hostelId}`, data),
};
export default adminService;