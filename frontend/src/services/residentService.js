import api from "./api";

const residentService = {

  registerResident(data) {
    return api.post("/residents/register", data);
  },

  getPendingResidents() {
    return api.get("/residents/pending");
  },

  getApprovedResidents() {
    return api.get("/residents/approved");
  },

  approveResident(id) {
    return api.put(`/residents/approve/${id}`);
  },

  rejectResident(id) {
    return api.delete(`/residents/reject/${id}`);
  },

  getResident(id) {
    return api.get(`/residents/${id}`);
  },

  updateResident(id, data) {
    return api.put(`/residents/update/${id}`, data);
  },

  deleteResident(id) {
    return api.delete(`/residents/delete/${id}`);
  }

};

export default residentService;