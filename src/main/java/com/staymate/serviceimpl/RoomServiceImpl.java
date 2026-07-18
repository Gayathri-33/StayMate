package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Hostel;
import com.staymate.entity.Room;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.HostelRepository;
import com.staymate.repository.RoomRepository;
import com.staymate.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Room addRoom(RoomDTO roomDTO) {

        Hostel hostel = hostelRepository.findById(roomDTO.getHostelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hostel not found with ID: " + roomDTO.getHostelId()));

        Room room = Room.builder()
                .hostel(hostel)
                .roomNumber(roomDTO.getRoomNumber())
                .floorNumber(roomDTO.getFloorNumber())
                .roomType(roomDTO.getRoomType())
                .capacity(roomDTO.getCapacity())
                .monthlyFee(roomDTO.getMonthlyFee())
                .build();

        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Integer roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with ID: " + roomId));
    }

    @Override
    public Room updateRoom(Integer roomId, RoomDTO roomDTO) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with ID: " + roomId));

        Hostel hostel = hostelRepository.findById(roomDTO.getHostelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hostel not found with ID: " + roomDTO.getHostelId()));

        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setFloorNumber(roomDTO.getFloorNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setCapacity(roomDTO.getCapacity());
        room.setMonthlyFee(roomDTO.getMonthlyFee());

        return roomRepository.save(room);
    }
}