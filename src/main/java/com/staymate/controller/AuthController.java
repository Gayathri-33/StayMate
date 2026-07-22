package com.staymate.controller;

import com.staymate.dto.*;
import com.staymate.entity.User;
import com.staymate.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody AdminRegisterRequest req) {
        try {
            User user = authService.registerAdmin(req);
            return ResponseEntity.ok(java.util.Map.of(
                    "message", "Registration submitted. Await Super Admin approval.",
                    "userId", user.getUserId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            LoginResponse response = authService.login(req);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(java.util.Map.of("error", e.getMessage()));
        }
    }
}