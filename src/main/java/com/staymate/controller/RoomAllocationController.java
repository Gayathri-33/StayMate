package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.RoomAllocationDTO;
import com.staymate.entity.RoomAllocation;
import com.staymate.service.RoomAllocationService;

@RestController
@RequestMapping("/room-allocation")
public class RoomAllocationController {

    @Autowired
    private RoomAllocationService roomAllocationService;

    @PostMapping
    public RoomAllocation allocateRoom(@RequestBody RoomAllocationDTO roomAllocationDTO) {
        return roomAllocationService.allocateRoom(roomAllocationDTO);
    }

    @PutMapping("/shift")
    public RoomAllocation shiftRoom(@RequestBody RoomAllocationDTO dto) {
        return roomAllocationService.shiftRoom(dto);
    }

    @DeleteMapping("/checkout/{residentId}")
    public String checkoutResident(@PathVariable Integer residentId) {
        return roomAllocationService.checkoutResident(residentId);
    }

    @GetMapping
    public List<RoomAllocation> getAllAllocations() {
        return roomAllocationService.getAllAllocations();
    }

    @GetMapping("/{allocationId}")
    public RoomAllocation getAllocationById(@PathVariable Integer allocationId) {
        return roomAllocationService.getAllocationById(allocationId);
    }
}