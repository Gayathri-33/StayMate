package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Room;
import com.staymate.service.RoomService;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins="*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room saveRoom(@RequestBody Room room){

        return roomService.saveRoom(room);

    }

    @GetMapping
    public List<Room> getAllRooms(){

        return roomService.getAllRooms();

    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Integer id){

        return roomService.getRoomById(id);

    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Integer id,@RequestBody Room room){

        return roomService.updateRoom(id, room);

    }

    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Integer id){

        roomService.deleteRoom(id);

        return "Room Deleted Successfully";

    }

}