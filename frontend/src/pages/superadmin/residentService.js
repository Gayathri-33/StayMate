import api from "./api";

const residentService = {
  // Dashboard
  getDashboard: () => api.get("/resident/dashboard"),

  // Room Shift (FIXED)
  getAvailableRoomsForShift: () => api.get("/resident/available-rooms"),
  requestRoomShift: (data) => api.post("/resident/room-shift", data),
  getMyRoomShiftRequests: () => api.get("/resident/room-shift/my-requests"),

  // Payment
  createPaymentOrder: () => api.post("/resident/payments/create-order"),
  verifyPayment: (data) => api.post("/resident/payments/verify", data),

  // Complaints & Feedback
  raiseComplaint: (data) => api.post("/resident/complaints", data),
  getMyComplaints: () => api.get("/resident/complaints"),
  submitFeedback: (data) => api.post("/resident/feedback", data),

  // Registration Search
  searchByPlace: (place) => api.get(`/residents/search/place?place=${place}`),
  searchByCode: (code) => api.get(`/residents/search/code/${code}`),
  getAvailableRooms: (hostelCode) => api.get(`/residents/rooms/available/${hostelCode}`),
  getAvailableBeds: (roomId) => api.get(`/residents/beds/available/${roomId}`),
  register: (data) => api.post("/residents/register", data),
};

export default residentService;