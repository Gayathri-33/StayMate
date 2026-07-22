package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.service.ResidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    private final ResidentService residentService;

    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
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
}