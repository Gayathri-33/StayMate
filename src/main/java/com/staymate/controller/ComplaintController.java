package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Complaint;
import com.staymate.enums.ComplaintCategory;
import com.staymate.enums.ComplaintStatus;
import com.staymate.service.ComplaintService;

@RestController
@RequestMapping("/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Create Complaint
    @PostMapping
    public Complaint saveComplaint(@RequestBody Complaint complaint) {
        return complaintService.saveComplaint(complaint);
    }

    // Get All Complaints
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // Get Complaint By ID
    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Integer id) {
        return complaintService.getComplaintById(id);
    }

    // Update Complaint
    @PutMapping("/{id}")
    public Complaint updateComplaint(@PathVariable Integer id,
                                     @RequestBody Complaint complaint) {

        return complaintService.updateComplaint(id, complaint);
    }

    // Delete Complaint
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Integer id) {

        complaintService.deleteComplaint(id);

        return "Complaint Deleted Successfully";
    }

    // Get Complaints By Status
    @GetMapping("/status/{status}")
    public List<Complaint> getComplaintsByStatus(
            @PathVariable ComplaintStatus status) {

        return complaintService.getComplaintsByStatus(status);
    }

    // Get Complaints By Category
    @GetMapping("/category/{category}")
    public List<Complaint> getComplaintsByCategory(
            @PathVariable ComplaintCategory category) {

        return complaintService.getComplaintsByCategory(category);
    }

}