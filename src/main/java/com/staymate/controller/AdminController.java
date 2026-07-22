package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    private Long currentUserId(Authentication auth) {
        return ((User) auth.getPrincipal()).getUserId();
    }

    // ---- Hostel Registration ----

    @PostMapping(value = "/hostels", consumes = "multipart/form-data")
    public ResponseEntity<?> registerHostel(Authentication auth,
                                             @RequestPart("data") HostelRegisterRequest req,
                                             @RequestPart(value = "qrImage", required = false) MultipartFile qrImage) {
        try {
            Hostel hostel = adminService.registerHostel(currentUserId(auth), req, qrImage);
            return ResponseEntity.ok(Map.of(
                    "message", "Hostel registration submitted. Await Super Admin approval.",
                    "hostelId", hostel.getHostelId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/hostels/mine")
    public ResponseEntity<?> myHostels(Authentication auth) {
        return ResponseEntity.ok(adminService.getMyHostels(currentUserId(auth)));
    }

    // ---- Dashboard ----

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication auth) {
        return ResponseEntity.ok(adminService.getDashboard(currentUserId(auth)));
    }

    // ---- Rooms ----

    @GetMapping("/rooms/hostel/{hostelCode}")
    public ResponseEntity<?> getRooms(@PathVariable String hostelCode) {
        return ResponseEntity.ok(adminService.getRooms(hostelCode));
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<?> getRoom(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getRoom(id));
    }

    @PostMapping("/rooms/hostel/{hostelCode}")
    public ResponseEntity<?> addRoom(@PathVariable String hostelCode, @RequestBody RoomDTO dto) {
        try {
            Room room = adminService.addRoom(hostelCode, dto);
            return ResponseEntity.ok(Map.of("message", "Room added", "roomId", room.getRoomId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody RoomDTO dto) {
        adminService.updateRoom(id, dto);
        return ResponseEntity.ok(Map.of("message", "Room updated"));
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        adminService.deleteRoom(id);
        return ResponseEntity.ok(Map.of("message", "Room deleted"));
    }

    // ---- Beds ----

    @GetMapping("/beds/room/{roomId}")
    public ResponseEntity<?> getBeds(@PathVariable Long roomId) {
        return ResponseEntity.ok(adminService.getBeds(roomId));
    }

    @GetMapping("/beds/hostel/{hostelCode}")
    public ResponseEntity<?> getAllBeds(@PathVariable String hostelCode) {
        return ResponseEntity.ok(adminService.getAllBedsForHostel(hostelCode));
    }

    @PostMapping("/beds/room/{roomId}")
    public ResponseEntity<?> addBed(@PathVariable Long roomId, @RequestBody Map<String, String> body) {
        try {
            adminService.addBed(roomId, body.get("bedNumber"));
            return ResponseEntity.ok(Map.of("message", "Bed added"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/beds/{id}")
    public ResponseEntity<?> deleteBed(@PathVariable Long id) {
        try {
            adminService.deleteBed(id);
            return ResponseEntity.ok(Map.of("message", "Bed deleted"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---- Notices ----

    @GetMapping("/notices/hostel/{hostelId}")
    public ResponseEntity<?> getNotices(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminService.getNotices(hostelId));
    }

    @PostMapping("/notices/hostel/{hostelId}")
    public ResponseEntity<?> addNotice(@PathVariable Long hostelId, @RequestBody NoticeRequest req) {
        adminService.addNotice(hostelId, req);
        return ResponseEntity.ok(Map.of("message", "Notice added"));
    }

    @DeleteMapping("/notices/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        adminService.deleteNotice(id);
        return ResponseEntity.ok(Map.of("message", "Notice deleted"));
    }

    // ---- Mess Menu ----

    @GetMapping("/mess/hostel/{hostelId}")
    public ResponseEntity<?> getMessMenu(@PathVariable Long hostelId) {
        return ResponseEntity.ok(adminService.getMessMenu(hostelId));
    }

    @PostMapping("/mess/hostel/{hostelId}")
    public ResponseEntity<?> addMessItem(@PathVariable Long hostelId, @RequestBody MessMenuRequest req) {
        adminService.addMessItem(hostelId, req);
        return ResponseEntity.ok(Map.of("message", "Mess item added"));
    }

    @DeleteMapping("/mess/{id}")
    public ResponseEntity<?> deleteMessItem(@PathVariable Long id) {
        adminService.deleteMessItem(id);
        return ResponseEntity.ok(Map.of("message", "Mess item deleted"));
    }
}