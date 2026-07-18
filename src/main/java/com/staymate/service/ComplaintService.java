package com.staymate.service;

import java.util.List;

import com.staymate.entity.Complaint;
import com.staymate.enums.ComplaintCategory;
import com.staymate.enums.ComplaintStatus;

public interface ComplaintService {

    Complaint saveComplaint(Complaint complaint);

    List<Complaint> getAllComplaints();

    Complaint getComplaintById(Integer complaintId);

    Complaint updateComplaint(Integer complaintId, Complaint complaint);

    void deleteComplaint(Integer complaintId);

    List<Complaint> getComplaintsByStatus(ComplaintStatus status);

    List<Complaint> getComplaintsByCategory(ComplaintCategory category);

}