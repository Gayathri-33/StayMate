package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Room;
import com.staymate.repository.RoomRepository;
import com.staymate.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room saveRoom(Room room) {

        return roomRepository.save(room);

    }

    @Override
    public List<Room> getAllRooms() {

        return roomRepository.findAll();

    }

    @Override
    public Room getRoomById(Integer id) {

        return roomRepository.findById(id).orElse(null);

    }

    @Override
    public Room updateRoom(Integer id, Room room) {

        Room existing = roomRepository.findById(id).orElse(null);

        if(existing!=null){

            existing.setHostel(room.getHostel());
            existing.setRoomNumber(room.getRoomNumber());
            existing.setFloorNumber(room.getFloorNumber());
            existing.setRoomType(room.getRoomType());
            existing.setCapacity(room.getCapacity());
            existing.setOccupiedCount(room.getOccupiedCount());
            existing.setMonthlyFee(room.getMonthlyFee());
            existing.setRoomStatus(room.getRoomStatus());

            return roomRepository.save(existing);

        }

        return null;
    }

    @Override
    public void deleteRoom(Integer id) {

        roomRepository.deleteById(id);

    }

}