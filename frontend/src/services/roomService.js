import api from "./api";

const API="/rooms";

export default{

    getRooms(){
        return api.get(API);
    },

    getRoom(id){
        return api.get(`${API}/${id}`);
    },

    addRoom(room){
        return api.post(API,room);
    },

    updateRoom(id,room){
        return api.put(`${API}/${id}`,room);
    },

    deleteRoom(id){
        return api.delete(`${API}/${id}`);
    }

}