package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.ResidentRegistrationDTO;
import com.staymate.entity.Resident;
import com.staymate.service.ResidentService;

@RestController
@RequestMapping("/residents")
@CrossOrigin(origins = "http://localhost:5173")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @PostMapping("/register")
    public Resident registerResident(@RequestBody ResidentRegistrationDTO dto) {
        return residentService.registerResident(dto);
    }

    @GetMapping("/pending")
    public List<Resident> getPendingResidents() {
        return residentService.getPendingResidents();
    }

    @GetMapping("/approved")
    public List<Resident> getApprovedResidents() {
        return residentService.getApprovedResidents();
    }

    @PutMapping("/approve/{id}")
    public Resident approveResident(@PathVariable Long id) {
        return residentService.approveResident(id);
    }

    @DeleteMapping("/reject/{id}")
    public Resident rejectResident(@PathVariable Long id) {
        return residentService.rejectResident(id);
    }
    @GetMapping("/{id}")
    public Resident getResident(@PathVariable Long id) {

        return residentService.getResidentById(id);

    }

    @PutMapping("/update/{id}")
    public Resident updateResident(
            @PathVariable Long id,
            @RequestBody ResidentRegistrationDTO dto) {

        return residentService.updateResident(id, dto);

    }

    @DeleteMapping("/delete/{id}")
    public void deleteResident(@PathVariable Long id) {

        residentService.deleteResident(id);

    }
    

}