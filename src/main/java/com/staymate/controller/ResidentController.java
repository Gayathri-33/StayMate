package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.repository.ResidentRepository;
import com.staymate.repository.RoomRepository;
import com.staymate.service.ResidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    private final ResidentService residentService;
    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    public ResidentController(ResidentService residentService, RoomRepository roomRepository, ResidentRepository residentRepository) {
        this.residentService = residentService;
		this.residentRepository = residentRepository;
		this.roomRepository = roomRepository;
    }

    private Long currentUserId(Authentication auth) {
        return ((User) auth.getPrincipal()).getUserId();
    }

    // ---- Public: hostel search + registration ----

    @GetMapping("/search/place")
    public ResponseEntity<?> searchByPlace(@RequestParam String place) {
        return ResponseEntity.ok(residentService.searchByPlace(place));
    }

    @GetMapping("/search/code/{hostelCode}")
    public ResponseEntity<?> searchByCode(@PathVariable String hostelCode) {
        try {
            return ResponseEntity.ok(residentService.searchByCode(hostelCode));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/rooms/available/{hostelCode}")
    public ResponseEntity<?> availableRooms(@PathVariable String hostelCode) {
        return ResponseEntity.ok(residentService.getAvailableRooms(hostelCode));
    }

    @GetMapping("/beds/available/{roomId}")
    public ResponseEntity<?> availableBeds(@PathVariable Long roomId) {
        return ResponseEntity.ok(residentService.getAvailableBeds(roomId));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ResidentRegisterRequest req) {
        try {
            User user = residentService.register(req);
            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful. Please log in to complete your payment.",
                    "userId", user.getUserId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---- Protected: resident dashboard + feedback ----

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication auth) {
        try {
            return ResponseEntity.ok(residentService.getDashboard(currentUserId(auth)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/feedback")
    public ResponseEntity<?> submitFeedback(Authentication auth, @RequestBody FeedbackRequest req) {
        try {
            residentService.submitFeedback(currentUserId(auth), req);
            return ResponseEntity.ok(Map.of("message", "Feedback submitted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/available-rooms")
    public ResponseEntity<?> getAvailableRooms(Authentication auth) {
        User user = (User) auth.getPrincipal();
        Resident resident = residentRepository.findByUser_UserId(user.getUserId())
            .orElseThrow(() -> new RuntimeException("Resident profile not found"));

        // Find rooms in the same hostel that have at least 1 available bed
        List<Room> rooms = roomRepository.findByHostel_HostelIdAndAvailableBedsGreaterThan(
            resident.getHostel().getHostelId(), 0
        );

        return ResponseEntity.ok(rooms);
    }
}