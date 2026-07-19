package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.HostelDTO;
import com.staymate.entity.Hostel;
import com.staymate.service.HostelService;

@RestController
@RequestMapping("/hostels")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping
    public Hostel addHostel(@RequestBody HostelDTO hostelDTO) {
        return hostelService.addHostel(hostelDTO);
    }
    
    @GetMapping
    public List<Hostel> getAllHostels() {
        return hostelService.getAllHostels();
    }
    
    @GetMapping("/{id}")
    public Hostel getHostelById(@PathVariable Integer id) {
        return hostelService.getHostelById(id);
    }

    @PutMapping("/{id}")
    public Hostel updateHostel(@PathVariable Integer id,
                               @RequestBody HostelDTO hostelDTO) {
        return hostelService.updateHostel(id, hostelDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteHostel(@PathVariable Integer id) {
        hostelService.deleteHostel(id);
    }

}