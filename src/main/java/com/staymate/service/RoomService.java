package com.staymate.service;

import java.util.List;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Room;

public interface RoomService {

	Room addRoom(RoomDTO roomDTO);

	List<Room> getAllRooms();

	Room getRoomById(Integer roomId);

	Room updateRoom(Integer roomId, RoomDTO roomDTO);

}