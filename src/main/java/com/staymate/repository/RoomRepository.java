package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Room;
import com.staymate.enums.RoomStatus;
@Repository
public interface RoomRepository extends JpaRepository<Room,Integer>{
	long countByRoomStatus(RoomStatus roomStatus);
}