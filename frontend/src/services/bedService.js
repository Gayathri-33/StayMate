import api from "./api";

const API = "/beds";

const getAllBeds = () => api.get(API);

const getBed = (id) => api.get(`${API}/${id}`);

const addBed = (bed) => api.post(API, bed);

const updateBed = (id, bed) => api.put(`${API}/${id}`, bed);

const deleteBed = (id) => api.delete(`${API}/${id}`);

const allocateBed = (bedId, residentId) =>
    api.put(`${API}/allocate/${bedId}/${residentId}`);

const vacateBed = (bedId) =>
    api.put(`${API}/vacate/${bedId}`);

export default {
    getAllBeds,
    getBed,
    addBed,
    updateBed,
    deleteBed,
    allocateBed,
    vacateBed
};