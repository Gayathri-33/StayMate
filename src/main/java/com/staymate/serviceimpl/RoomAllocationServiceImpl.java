package com.staymate.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.staymate.dto.RoomAllocationDTO;
import com.staymate.entity.Resident;
import com.staymate.entity.Room;
import com.staymate.entity.RoomAllocation;
import com.staymate.entity.User;
import com.staymate.enums.RoomStatus;
import com.staymate.exception.BusinessValidationException;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.ResidentRepository;
import com.staymate.repository.RoomAllocationRepository;
import com.staymate.repository.RoomRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.RoomAllocationService;

@Transactional
@Service
public class RoomAllocationServiceImpl implements RoomAllocationService {

    @Autowired
    private RoomAllocationRepository roomAllocationRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public RoomAllocation allocateRoom(RoomAllocationDTO roomAllocationDTO) {
	    	Resident resident = residentRepository.findById(roomAllocationDTO.getResidentId())
	    	        .orElseThrow(() -> new ResourceNotFoundException("Resident not found."));
	
	    	Room room = roomRepository.findById(roomAllocationDTO.getRoomId())
	    	        .orElseThrow(() -> new ResourceNotFoundException("Room not found."));
	    	
	    	if (roomAllocationRepository.existsByResident(resident)) {
	    	    throw new BusinessValidationException("Resident is already allocated.");
	    	}
	    	if (room.getOccupiedCount() >= room.getCapacity()) {
	    	    throw new BusinessValidationException("Room is full.");
	    	}
	    	
	    	RoomAllocation allocation = new RoomAllocation();

	    	allocation.setResident(resident);
	    	allocation.setRoom(room);
	    	allocation.setAllocatedDate(LocalDate.now());
	    	
	    	room.setOccupiedCount(room.getOccupiedCount() + 1);

	    	if (room.getOccupiedCount().equals(room.getCapacity())) {
	    	    room.setRoomStatus(RoomStatus.FULL);
	    	}
	    	
	    	roomRepository.save(room);

	    	return roomAllocationRepository.save(allocation);
    }

    @Override
    public RoomAllocation shiftRoom(RoomAllocationDTO dto) {
	    	Resident resident = residentRepository.findById(dto.getResidentId())
	    	        .orElseThrow(() -> new ResourceNotFoundException("Resident not found."));
	    	RoomAllocation allocation = roomAllocationRepository.findByResident(resident)
	    	        .orElseThrow(() -> new ResourceNotFoundException("Room allocation not found."));
	    	Room newRoom = roomRepository.findById(dto.getRoomId())
	    	        .orElseThrow(() -> new ResourceNotFoundException("Room not found."));
	    	
	    	Room oldRoom = allocation.getRoom();
	    	
	    	if (oldRoom.getRoomId().equals(newRoom.getRoomId())) {
	    	    throw new BusinessValidationException("Resident is already in this room.");
	    	}
	    	
	    	if (newRoom.getOccupiedCount() >= newRoom.getCapacity()) {
	    	    throw new BusinessValidationException("New room is full.");
	    	}
	    	
	    	oldRoom.setOccupiedCount(oldRoom.getOccupiedCount() - 1);

	    	if (oldRoom.getOccupiedCount() < oldRoom.getCapacity()) {
	    	    oldRoom.setRoomStatus(RoomStatus.AVAILABLE);
	    	}
	    	
	    	newRoom.setOccupiedCount(newRoom.getOccupiedCount() + 1);

	    	if (newRoom.getOccupiedCount().equals(newRoom.getCapacity())) {
	    	    newRoom.setRoomStatus(RoomStatus.FULL);
	    	}
	    	
	    	allocation.setRoom(newRoom);
	    	
	    	roomRepository.save(oldRoom);
	    	roomRepository.save(newRoom);

	    	return roomAllocationRepository.save(allocation);
	    	
    }

    @Override
    public String checkoutResident(Integer residentId) {
	    	Resident resident = residentRepository.findById(residentId)
	    	        .orElseThrow(() -> new ResourceNotFoundException("Resident not found."));
	    	RoomAllocation allocation = roomAllocationRepository.findByResident(resident)
	    	        .orElseThrow(() -> new ResourceNotFoundException("Room allocation not found."));
	    	
	    	Room room = allocation.getRoom();
	    	
	    	room.setOccupiedCount(room.getOccupiedCount() - 1);

	    	if (room.getOccupiedCount() < room.getCapacity()) {
	    	    room.setRoomStatus(RoomStatus.AVAILABLE);
	    	}
	    	
	    	roomRepository.save(room);
	    	
	    	User user = resident.getUser();
	    	roomAllocationRepository.delete(allocation);
	    	residentRepository.delete(resident);
	    	userRepository.delete(user);
	    	
	    	return "Resident checked out successfully.";
    }

    @Override
    public List<RoomAllocation> getAllAllocations() {
    		return roomAllocationRepository.findAll();
    }

    @Override
    public RoomAllocation getAllocationById(Integer allocationId) {
    	return roomAllocationRepository.findById(allocationId)
                .orElseThrow(() -> new ResourceNotFoundException("Room allocation not found."));
    }
}