package com.staymate.service;

import java.util.List;

import com.staymate.entity.RoomAllocation;

public interface RoomAllocationService {

    RoomAllocation save(RoomAllocation allocation);

    List<RoomAllocation> getAll();

    RoomAllocation getById(Integer id);

    RoomAllocation update(Integer id, RoomAllocation allocation);

    void delete(Integer id);

}