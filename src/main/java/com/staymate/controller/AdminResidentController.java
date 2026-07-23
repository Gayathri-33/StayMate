package com.staymate.controller;

import com.staymate.entity.Resident;
import com.staymate.service.AdminResidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/residents")
public class AdminResidentController {

    private final AdminResidentService adminResidentService;

    public AdminResidentController(AdminResidentService adminResidentService) {
        this.adminResidentService = adminResidentService;
    }

    @GetMapping("/hostel/{hostelId}/pending")
    public ResponseEntity<?> getPendingResidents(@PathVariable Long hostelId) {
        List<Resident> residents = adminResidentService.getPendingResidents(hostelId);
        return ResponseEntity.ok(residents);
    }

    @PutMapping("/approve/{residentId}")
    public ResponseEntity<?> approveResident(@PathVariable Long residentId) {
        try {
            adminResidentService.approveResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident approved successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/reject/{residentId}")
    public ResponseEntity<?> rejectResident(@PathVariable Long residentId) {
        try {
            adminResidentService.rejectResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident rejected"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}