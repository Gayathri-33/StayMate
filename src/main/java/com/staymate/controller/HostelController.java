package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Hostel;
import com.staymate.service.HostelService;

@RestController
@RequestMapping("/hostels")
@CrossOrigin(origins = "*")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping
    public Hostel saveHostel(@RequestBody Hostel hostel){

        return hostelService.saveHostel(hostel);

    }

    @GetMapping
    public List<Hostel> getAllHostels(){

        return hostelService.getAllHostels();

    }

    @GetMapping("/{id}")
    public Hostel getHostelById(@PathVariable Integer id){

        return hostelService.getHostelById(id);

    }

    @PutMapping("/{id}")
    public Hostel updateHostel(@PathVariable Integer id,@RequestBody Hostel hostel){

        return hostelService.updateHostel(id, hostel);

    }

    @DeleteMapping("/{id}")
    public String deleteHostel(@PathVariable Integer id){

        hostelService.deleteHostel(id);

        return "Hostel Deleted Successfully";

    }

}