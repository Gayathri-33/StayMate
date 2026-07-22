package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.HostelRegistrationDTO;
import com.staymate.entity.Hostel;
import com.staymate.service.HostelService;

@RestController
@RequestMapping("/hostels")
@CrossOrigin(origins = "http://localhost:5173")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping("/register")
    public Hostel registerHostel(@RequestBody HostelRegistrationDTO dto) {

        return hostelService.registerHostel(dto);

    }

    @GetMapping("/pending")
    public List<Hostel> getPendingHostels() {

        return hostelService.getPendingHostels();

    }

    @PutMapping("/approve/{id}")
    public Hostel approveHostel(@PathVariable Long id) {

        return hostelService.approveHostel(id);

    }

    @DeleteMapping("/reject/{id}")
    public Hostel rejectHostel(@PathVariable Long id) {

        return hostelService.rejectHostel(id);

    }
    @GetMapping("/approved")
    public List<Hostel> getApprovedHostels() {

        return hostelService.getApprovedHostels();

    }

}