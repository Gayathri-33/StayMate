import api from "./api";

const adminService = {
  getAdmins: () => api.get("/superadmin/admins"),

  getAdminById: (id) =>
    api.get(`/superadmin/admins/${id}`),

  addAdmin: (admin) =>
    api.post("/superadmin/admins", admin),

  updateAdmin: (id, admin) =>
    api.put(`/superadmin/admins/${id}`, admin),

  deleteAdmin: (id) =>
    api.delete(`/superadmin/admins/${id}`)
};

export default adminService;