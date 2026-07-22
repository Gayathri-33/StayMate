package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.User;
import com.staymate.enums.ComplaintStatus;
import com.staymate.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    private Long currentUserId(Authentication auth) {
        return ((User) auth.getPrincipal()).getUserId();
    }

    // ---- Resident ----

    @PostMapping("/api/resident/complaints")
    public ResponseEntity<?> raise(Authentication auth, @RequestBody ComplaintRequest req) {
        try {
            complaintService.raiseComplaint(currentUserId(auth), req);
            return ResponseEntity.ok(Map.of("message", "Complaint submitted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/api/resident/complaints")
    public ResponseEntity<?> myComplaints(Authentication auth) {
        return ResponseEntity.ok(complaintService.getMyComplaints(currentUserId(auth)));
    }

    // ---- Admin ----

    @GetMapping("/api/admin/complaints/hostel/{hostelId}")
    public ResponseEntity<?> forHostel(@PathVariable Long hostelId,
                                        @RequestParam(required = false) ComplaintStatus status) {
        return ResponseEntity.ok(complaintService.getComplaintsForHostel(hostelId, status));
    }

    @PutMapping("/api/admin/complaints/resolve/{id}")
    public ResponseEntity<?> resolve(@PathVariable Long id) {
        try {
            complaintService.resolveComplaint(id);
            return ResponseEntity.ok(Map.of("message", "Complaint marked as resolved"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}