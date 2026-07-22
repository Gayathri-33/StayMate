package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Room;
import com.staymate.repository.RoomRepository;
import com.staymate.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room addRoom(RoomDTO dto) {

        Room room = new Room();

        room.setRoomNumber(dto.getRoomNumber());
        room.setRoomType(dto.getRoomType());
        room.setCapacity(dto.getCapacity());

        room.setOccupiedBeds(0);
        room.setAvailableBeds(dto.getCapacity());

        room.setHostelCode(dto.getHostelCode());

        return roomRepository.save(room);
    }

    @Override
    public List<Room> getRooms(String hostelCode) {

        return roomRepository.findByHostelCode(hostelCode);

    }

    @Override
    public Room updateRoom(Long id, RoomDTO dto) {

        Room room = roomRepository.findById(id).orElse(null);

        if (room != null) {

            room.setRoomNumber(dto.getRoomNumber());
            room.setRoomType(dto.getRoomType());

            int occupied = room.getOccupiedBeds();

            room.setCapacity(dto.getCapacity());
            room.setAvailableBeds(dto.getCapacity() - occupied);

            return roomRepository.save(room);
        }

        return null;
    }

    @Override
    public void deleteRoom(Long id) {

        roomRepository.deleteById(id);

    }
}