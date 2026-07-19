package com.staymate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.staymate.dto.AdminDashboardDTO;
import com.staymate.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardDTO dashboard() {

        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalStudents(adminService.getTotalStudents());
        dto.setTotalRooms(adminService.getTotalRooms());
        dto.setAvailableRooms(adminService.getAvailableRooms());
        dto.setPendingComplaints(adminService.getPendingComplaints());
        dto.setResolvedComplaints(adminService.getResolvedComplaints());
        dto.setPendingPayments(adminService.getPendingPayments());
        dto.setTotalRevenue(adminService.getTotalRevenue());

        return dto;
    }

}
