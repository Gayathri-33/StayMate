package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.RoomAllocation;
import com.staymate.repository.RoomAllocationRepository;
import com.staymate.service.RoomAllocationService;

@Service
public class RoomAllocationServiceImpl implements RoomAllocationService {

    @Autowired
    private RoomAllocationRepository repository;

    @Override
    public RoomAllocation save(RoomAllocation allocation) {
        return repository.save(allocation);
    }

    @Override
    public List<RoomAllocation> getAll() {
        return repository.findAll();
    }

    @Override
    public RoomAllocation getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public RoomAllocation update(Integer id, RoomAllocation allocation) {

        RoomAllocation existing=repository.findById(id).orElse(null);

        if(existing!=null){

            existing.setStudent(allocation.getStudent());
            existing.setRoom(allocation.getRoom());
            existing.setAllocatedDate(allocation.getAllocatedDate());
            existing.setVacatedDate(allocation.getVacatedDate());
            existing.setAllocationStatus(allocation.getAllocationStatus());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void delete(Integer id) {

        repository.deleteById(id);

    }

}