package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.RoomAllocation;
import com.staymate.service.RoomAllocationService;

@RestController
@RequestMapping("/allocations")
@CrossOrigin(origins="*")
public class RoomAllocationController {

    @Autowired
    private RoomAllocationService service;

    @PostMapping
    public RoomAllocation save(@RequestBody RoomAllocation allocation){

        return service.save(allocation);

    }

    @GetMapping
    public List<RoomAllocation> getAll(){

        return service.getAll();

    }

    @GetMapping("/{id}")
    public RoomAllocation getById(@PathVariable Integer id){

        return service.getById(id);

    }

    @PutMapping("/{id}")
    public RoomAllocation update(@PathVariable Integer id,
                                 @RequestBody RoomAllocation allocation){

        return service.update(id,allocation);

    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){

        service.delete(id);

        return "Deleted Successfully";

    }

}