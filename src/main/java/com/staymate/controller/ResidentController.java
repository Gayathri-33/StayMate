package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.ResidentDTO;
import com.staymate.entity.Resident;
import com.staymate.service.ResidentService;

@RestController
@RequestMapping("/residents")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @PostMapping
    public Resident addResident(@RequestBody ResidentDTO residentDTO) {
        return residentService.addResident(residentDTO);
    }

    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("/{residentId}")
    public Resident getResidentById(@PathVariable Integer residentId) {
        return residentService.getResidentById(residentId);
    }

    @PutMapping("/{residentId}")
    public Resident updateResident(@PathVariable Integer residentId,
                                   @RequestBody ResidentDTO residentDTO) {
        return residentService.updateResident(residentId, residentDTO);
    }

    @DeleteMapping("/{residentId}")
    public void deleteResident(@PathVariable Integer residentId) {
        residentService.deleteResident(residentId);
    }
}