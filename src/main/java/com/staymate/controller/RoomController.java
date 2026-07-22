package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.RoomDTO;
import com.staymate.entity.Room;
import com.staymate.service.RoomService;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room addRoom(@RequestBody RoomDTO dto) {

        return roomService.addRoom(dto);

    }

    @GetMapping("/{hostelCode}")
    public List<Room> getRooms(@PathVariable String hostelCode) {

        return roomService.getRooms(hostelCode);

    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id,
                           @RequestBody RoomDTO dto) {

        return roomService.updateRoom(id, dto);

    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {

        roomService.deleteRoom(id);

    }
}