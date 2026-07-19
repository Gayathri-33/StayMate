import api from "./api";

export const getRooms = () =>
    api.get("/rooms");

export const getRoomById = (id) =>
    api.get(`/rooms/${id}`);

export const addRoom = (room) =>
    api.post("/rooms", room);

export const updateRoom = (id, room) =>
    api.put(`/rooms/${id}`, room);

export const deleteRoom = (id) =>
    api.delete(`/rooms/${id}`);