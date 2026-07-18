package com.staymate.service;

import java.util.List;

import com.staymate.entity.Room;

public interface RoomService {

    Room saveRoom(Room room);

    List<Room> getAllRooms();

    Room getRoomById(Integer id);

    Room updateRoom(Integer id, Room room);

    void deleteRoom(Integer id);

}