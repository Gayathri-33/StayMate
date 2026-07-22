package com.staymate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.AdminDashboardDTO;
import com.staymate.service.AdminDashboardService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/dashboard")
    public AdminDashboardDTO dashboard() {
        return adminDashboardService.getDashboard();
    }
}