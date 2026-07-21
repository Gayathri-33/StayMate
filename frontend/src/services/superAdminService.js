import api from "./api";

const superAdminService = {

  addAdmin: async (admin) => {
    return await api.post("/superadmin/admins", admin);
  },

  getAllAdmins: async () => {
    return await api.get("/superadmin/admins");
  }

};

export default superAdminService;