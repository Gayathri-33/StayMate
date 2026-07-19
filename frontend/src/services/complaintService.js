import api from "./api";

export const getComplaints = () =>
    api.get("/complaints");

export const getComplaintById = (id) =>
    api.get(`/complaints/${id}`);

export const addComplaint = (complaint) =>
    api.post("/complaints", complaint);

export const updateComplaint = (id, complaint) =>
    api.put(`/complaints/${id}`, complaint);

export const deleteComplaint = (id) =>
    api.delete(`/complaints/${id}`);

export const getComplaintsByStatus = (status) =>
    api.get(`/complaints/status/${status}`);

export const getComplaintsByCategory = (category) =>
    api.get(`/complaints/category/${category}`);