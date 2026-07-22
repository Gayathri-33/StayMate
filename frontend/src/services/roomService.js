import api from "./api";

const getRooms = (hostelCode) =>
  api.get(`/rooms/hostel/${hostelCode}`);

const getRoom = (id) =>
  api.get(`/rooms/${id}`);

const addRoom = (room) =>
  api.post("/rooms", room);

const updateRoom = (id, room) =>
  api.put(`/rooms/${id}`, room);

const deleteRoom = (id) =>
  api.delete(`/rooms/${id}`);

export default {
  getRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
};