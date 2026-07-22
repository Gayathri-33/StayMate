package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.User;
import com.staymate.enums.RoomShiftStatus;
import com.staymate.service.RoomShiftService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class RoomShiftController {

    private final RoomShiftService roomShiftService;

    public RoomShiftController(RoomShiftService roomShiftService) {
        this.roomShiftService = roomShiftService;
    }

    private Long currentUserId(Authentication auth) {
        return ((User) auth.getPrincipal()).getUserId();
    }

    // ---- Resident ----

    @PostMapping("/api/resident/room-shift")
    public ResponseEntity<?> request(Authentication auth, @RequestBody RoomShiftCreateRequest req) {
        try {
            roomShiftService.requestShift(currentUserId(auth), req);
            return ResponseEntity.ok(Map.of("message", "Room shift request submitted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/api/resident/room-shift")
    public ResponseEntity<?> myRequests(Authentication auth) {
        return ResponseEntity.ok(roomShiftService.getMyRequests(currentUserId(auth)));
    }

    // ---- Admin ----

    @GetMapping("/api/admin/room-shift/hostel/{hostelId}")
    public ResponseEntity<?> forHostel(@PathVariable Long hostelId,
                                        @RequestParam(defaultValue = "PENDING") RoomShiftStatus status) {
        return ResponseEntity.ok(roomShiftService.getRequestsForHostel(hostelId, status));
    }

    @PutMapping("/api/admin/room-shift/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        try {
            roomShiftService.approveShift(id);
            return ResponseEntity.ok(Map.of("message", "Room shift approved"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/api/admin/room-shift/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        try {
            roomShiftService.rejectShift(id);
            return ResponseEntity.ok(Map.of("message", "Room shift rejected"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}