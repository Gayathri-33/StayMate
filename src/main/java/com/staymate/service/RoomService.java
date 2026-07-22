package com.staymate.service;

import java.util.List;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Room;

public interface RoomService {

	Room addRoom(RoomDTO dto);

	List<Room> getAllRooms();     // NEW

	List<Room> getRooms(String hostelCode);

	Room updateRoom(Long id, RoomDTO dto);

	void deleteRoom(Long id);
	
	Room getRoom(Long id);
}