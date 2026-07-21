package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.HostelAddDTO;
import com.staymate.dto.HostelResponseDTO;
import com.staymate.service.HostelService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/hostels")
public class HostelController {

    @Autowired
    private HostelService hostelService;

    @PostMapping
    public ResponseEntity<String> addHostel(@Valid @RequestBody HostelAddDTO hostelAddDTO) {

        String response = hostelService.addHostel(hostelAddDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<HostelResponseDTO>> getAllHostels() {

        return ResponseEntity.ok(hostelService.getAllHostels());

    }
    
    @GetMapping("/{hostelId}")
    public ResponseEntity<HostelResponseDTO> getHostelById(@PathVariable Long hostelId) {

        return ResponseEntity.ok(hostelService.getHostelById(hostelId));

    }
    
    @PutMapping("/{hostelId}")
    public ResponseEntity<String> updateHostel(
            @PathVariable Long hostelId,
            @Valid @RequestBody HostelAddDTO hostelAddDTO) {

        String response = hostelService.updateHostel(hostelId, hostelAddDTO);

        return ResponseEntity.ok(response);
    }
}