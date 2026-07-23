package com.staymate.controller;

import com.staymate.service.AdminResidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/residents")
public class AdminResidentController {

    private final AdminResidentService adminResidentService;

    public AdminResidentController(AdminResidentService adminResidentService) {
        this.adminResidentService = adminResidentService;
    }

    @GetMapping("/hostel/{hostelId}")
    public ResponseEntity<?> all(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminResidentService.getAllResidents(hostelId));
    }

    @GetMapping("/hostel/{hostelId}/pending")
    public ResponseEntity<?> pending(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminResidentService.getPendingResidents(hostelId));
    }

    @GetMapping("/hostel/{hostelId}/approved")
    public ResponseEntity<?> approved(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminResidentService.getApprovedResidents(hostelId));
    }

    @GetMapping("/hostel/{hostelId}/rejected")
    public ResponseEntity<?> rejected(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminResidentService.getRejectedResidents(hostelId));
    }

    @GetMapping("/{residentId}")
    public ResponseEntity<?> detail(@PathVariable Long residentId) {
        try {
            return ResponseEntity.ok(adminResidentService.getResidentDetail(residentId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/approve/{residentId}")
    public ResponseEntity<?> approve(@PathVariable Long residentId) {
        try {
            adminResidentService.approveResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident approved successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/reject/{residentId}")
    public ResponseEntity<?> reject(@PathVariable Long residentId) {
        try {
            adminResidentService.rejectResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident rejected"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/block/{residentId}")
    public ResponseEntity<?> block(@PathVariable Long residentId) {
        try {
            adminResidentService.blockResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident blocked"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/unblock/{residentId}")
    public ResponseEntity<?> unblock(@PathVariable Long residentId) {
        try {
            adminResidentService.unblockResident(residentId);
            return ResponseEntity.ok(Map.of("message", "Resident unblocked"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}