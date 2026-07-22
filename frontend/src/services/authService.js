
import api from "./api";

const authService = {
  login: (loginData) => api.post("/auth/login", loginData),

  registerAdmin: (adminData) => api.post("/auth/register/admin", adminData),

  saveAuthData: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getUser: () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  getToken: () => localStorage.getItem("token"),

  isAuthenticated: () => !!localStorage.getItem("token"),
};

export default authService;