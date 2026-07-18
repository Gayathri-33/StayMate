package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.RoomShiftRequest;
import com.staymate.enums.RequestStatus;
import com.staymate.service.RoomShiftService;

@RestController
@RequestMapping("/roomshift")
@CrossOrigin(origins="*")
public class RoomShiftController {

    @Autowired
    private RoomShiftService service;

    @PostMapping
    public RoomShiftRequest save(@RequestBody RoomShiftRequest request){

        return service.saveRequest(request);

    }

    @GetMapping
    public List<RoomShiftRequest> getAll(){

        return service.getAllRequests();

    }

    @GetMapping("/{id}")
    public RoomShiftRequest getById(@PathVariable Integer id){

        return service.getRequestById(id);

    }

    @PutMapping("/{id}")
    public RoomShiftRequest update(@PathVariable Integer id,
                                   @RequestBody RoomShiftRequest request){

        return service.updateRequest(id,request);

    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){

        service.deleteRequest(id);

        return "Room Shift Request Deleted Successfully";

    }

    @GetMapping("/status/{status}")
    public List<RoomShiftRequest> getByStatus(@PathVariable RequestStatus status){

        return service.getRequestsByStatus(status);

    }

}