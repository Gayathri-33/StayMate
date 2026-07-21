import api from "./api";

const authService = {

    login: async (loginData) => {

        return await api.post("/auth/login", loginData);

    },

    logout: () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

    },

    saveAuthData: (token, user) => {

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

    },

    getToken: () => {

        return localStorage.getItem("token");

    },

    getUser: () => {

        return JSON.parse(localStorage.getItem("user"));

    },

    isAuthenticated: () => {

        return localStorage.getItem("token") !== null;

    }

};

export default authService;