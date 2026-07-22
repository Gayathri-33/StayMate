import api from "./api";

const hostelService = {

    registerHostel: (hostel) =>
        api.post("/hostels/register", hostel),

    getPendingHostels: () =>
        api.get("/hostels/pending"),

    getApprovedHostels: () =>
        api.get("/hostels/approved"),

    approveHostel: (id) =>
        api.put(`/hostels/approve/${id}`),

    rejectHostel: (id) =>
        api.delete(`/hostels/reject/${id}`)

};

export default hostelService;