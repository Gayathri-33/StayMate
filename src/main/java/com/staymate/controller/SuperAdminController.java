package com.staymate.controller;

import com.staymate.enums.AdminStatus;
import com.staymate.enums.HostelStatus;
import com.staymate.service.SuperAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/superadmin")
public class SuperAdminController {

    private final SuperAdminService superAdminService;

    public SuperAdminController(SuperAdminService superAdminService) {
        this.superAdminService = superAdminService;
    }

    // ---- Admins ----

    @GetMapping("/admins/pending")
    public ResponseEntity<?> pendingAdmins() {
        return ResponseEntity.ok(superAdminService.getAdminsByStatus(AdminStatus.PENDING));
    }

    @GetMapping("/admins/approved")
    public ResponseEntity<?> approvedAdmins() {
        return ResponseEntity.ok(superAdminService.getAdminsByStatus(AdminStatus.APPROVED));
    }

    @GetMapping("/admins/rejected")
    public ResponseEntity<?> rejectedAdmins() {
        return ResponseEntity.ok(superAdminService.getAdminsByStatus(AdminStatus.REJECTED));
    }

    @PutMapping("/admins/approve/{userId}")
    public ResponseEntity<?> approveAdmin(@PathVariable Long userId) {
        try {
            superAdminService.approveAdmin(userId);
            return ResponseEntity.ok(Map.of("message", "Admin approved"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/admins/reject/{userId}")
    public ResponseEntity<?> rejectAdmin(@PathVariable Long userId) {
        try {
            superAdminService.rejectAdmin(userId);
            return ResponseEntity.ok(Map.of("message", "Admin rejected"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---- Hostels ----

    @GetMapping("/hostels/pending")
    public ResponseEntity<?> pendingHostels() {
        return ResponseEntity.ok(superAdminService.getHostelsByStatus(HostelStatus.PENDING));
    }

    @GetMapping("/hostels/approved")
    public ResponseEntity<?> approvedHostels() {
        return ResponseEntity.ok(superAdminService.getHostelsByStatus(HostelStatus.APPROVED));
    }

    @GetMapping("/hostels/rejected")
    public ResponseEntity<?> rejectedHostels() {
        return ResponseEntity.ok(superAdminService.getHostelsByStatus(HostelStatus.REJECTED));
    }

    @PutMapping("/hostels/approve/{hostelId}")
    public ResponseEntity<?> approveHostel(@PathVariable Long hostelId) {
        try {
            String code = superAdminService.approveHostel(hostelId);
            return ResponseEntity.ok(Map.of("message", "Hostel approved", "hostelCode", code));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/hostels/reject/{hostelId}")
    public ResponseEntity<?> rejectHostel(@PathVariable Long hostelId) {
        try {
            superAdminService.rejectHostel(hostelId);
            return ResponseEntity.ok(Map.of("message", "Hostel rejected"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---- Dashboard ----

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        return ResponseEntity.ok(superAdminService.getDashboardStats());
    }

    // ---- Notifications ----

    @GetMapping("/notifications")
    public ResponseEntity<?> notifications() {
        return ResponseEntity.ok(superAdminService.getNotifications());
    }

    @PutMapping("/notifications/read/{id}")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        try {
            superAdminService.markNotificationRead(id);
            return ResponseEntity.ok(Map.of("message", "Marked as read"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    @PutMapping("/admins/status/{userId}/{status}")
    public ResponseEntity<?> updateAdminStatus(@PathVariable Long userId, @PathVariable String status) {
        try {
            superAdminService.updateAdminStatus(userId, AdminStatus.valueOf(status));
            return ResponseEntity.ok(Map.of("message", "Status updated to " + status));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}