import api from "./api";

const dashboardService = {

    getDashboardData: () => api.get("/dashboard")

};

export default dashboardService;