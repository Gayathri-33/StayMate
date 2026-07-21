package com.staymate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register/resident")
    public ResponseEntity<String> registerResident(
            @RequestBody ResidentRegisterRequestDTO request) {

        return ResponseEntity.ok(userService.registerResident(request));
    }
}
