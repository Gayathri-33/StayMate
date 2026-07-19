import api from "./api";

export const getNotices = () =>
    api.get("/notices");

export const getNoticeById = (id) =>
    api.get(`/notices/${id}`);

export const addNotice = (notice) =>
    api.post("/notices", notice);

export const updateNotice = (id, notice) =>
    api.put(`/notices/${id}`, notice);

export const deleteNotice = (id) =>
    api.delete(`/notices/${id}`);