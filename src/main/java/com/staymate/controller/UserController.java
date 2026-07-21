package com.staymate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerResident(
            @Valid @RequestBody ResidentRegisterRequestDTO dto) {

        String response = userService.registerResident(dto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}