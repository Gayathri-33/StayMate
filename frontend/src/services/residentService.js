import api from "./api";

const residentService = {
  // --- Public Registration Flow ---
  searchByPlace: (place) => api.get(`/residents/search/place?place=${place}`),
  searchByCode: (code) => api.get(`/residents/search/code/${code}`),
  getAvailableRooms: (hostelCode) => api.get(`/residents/rooms/available/${hostelCode}`),
  getAvailableBeds: (roomId) => api.get(`/residents/beds/available/${roomId}`),
  register: (data) => api.post("/residents/register", data),

  // --- Protected: Dashboard & Feedback ---
  getDashboard: () => api.get("/residents/dashboard"),
  submitFeedback: (data) => api.post("/residents/feedback", data),

  // --- Protected: Complaints ---
  raiseComplaint: (data) => api.post("/resident/complaints", data),
  getMyComplaints: () => api.get("/resident/complaints"),

  // --- Protected: Room Shifts ---
  requestRoomShift: (data) => api.post("/resident/room-shift", data),
  getMyRoomShiftRequests: () => api.get("/resident/room-shift"),

  // --- Protected: Payments ---
  createPaymentOrder: () => api.post("/resident/payments/create-order"),
  verifyPayment: (data) => api.post("/resident/payments/verify", data),
  getPaymentHistory: () => api.get("/resident/payments/history"),
};

export default residentService;
