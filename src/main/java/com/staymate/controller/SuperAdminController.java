package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.User;
import com.staymate.service.SuperAdminService;

@RestController
@RequestMapping("/superadmin")
@CrossOrigin(origins = "http://localhost:5173")
public class SuperAdminController {

    @Autowired
    private SuperAdminService superAdminService;

    // Add Admin
    @PostMapping("/admins")
    public User addAdmin(@RequestBody User user) {
        return superAdminService.addAdmin(user);
    }

    // Get All Admins
    @GetMapping("/admins")
    public List<User> getAllAdmins() {
        return superAdminService.getAllAdmins();
    }

    // Get Admin By ID
    @GetMapping("/admins/{id}")
    public User getAdminById(@PathVariable Long id) {
        return superAdminService.getAdminById(id);
    }

    // Update Admin
    @PutMapping("/admins/{id}")
    public User updateAdmin(@PathVariable Long id, @RequestBody User user) {
        return superAdminService.updateAdmin(id, user);
    }

    // Delete Admin
    @DeleteMapping("/admins/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        superAdminService.deleteAdmin(id);
    }
}