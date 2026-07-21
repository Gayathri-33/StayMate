package com.staymate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register/resident")
    public ResponseEntity<String> registerResident(
            @RequestBody ResidentRegisterRequestDTO request) {

        return ResponseEntity.ok(userService.registerResident(request));
    }
}