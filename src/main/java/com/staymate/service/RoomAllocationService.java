package com.staymate.service;

import java.util.List;

import com.staymate.dto.RoomAllocationDTO;
import com.staymate.entity.RoomAllocation;

public interface RoomAllocationService {

    RoomAllocation allocateRoom(RoomAllocationDTO roomAllocationDTO);

    RoomAllocation shiftRoom(RoomAllocationDTO dto);

    String checkoutResident(Integer residentId);

    List<RoomAllocation> getAllAllocations();

    RoomAllocation getAllocationById(Integer allocationId);
}