package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Room;
import com.staymate.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room addRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.addRoom(roomDTO);
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Integer id) {
        return roomService.getRoomById(id);
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Integer id,
                           @RequestBody RoomDTO roomDTO) {
        return roomService.updateRoom(id, roomDTO);
    }

}