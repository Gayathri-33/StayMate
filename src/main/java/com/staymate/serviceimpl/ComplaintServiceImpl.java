package com.staymate.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Complaint;
import com.staymate.enums.ComplaintCategory;
import com.staymate.enums.ComplaintStatus;
import com.staymate.repository.ComplaintRepository;
import com.staymate.service.ComplaintService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint saveComplaint(Complaint complaint) {

        complaint.setComplaintDate(LocalDateTime.now());

        if (complaint.getStatus() == null) {
            complaint.setStatus(ComplaintStatus.PENDING);
        }

        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();

    }

    @Override
    public Complaint getComplaintById(Integer complaintId) {

        return complaintRepository.findById(complaintId).orElse(null);

    }

    @Override
    public Complaint updateComplaint(Integer complaintId, Complaint complaint) {

        Complaint existingComplaint =
                complaintRepository.findById(complaintId).orElse(null);

        if (existingComplaint != null) {

            existingComplaint.setCategory(complaint.getCategory());
            existingComplaint.setComplaintTitle(complaint.getComplaintTitle());
            existingComplaint.setComplaintDescription(complaint.getComplaintDescription());
            existingComplaint.setStatus(complaint.getStatus());
            existingComplaint.setAdminRemarks(complaint.getAdminRemarks());

            if (complaint.getStatus() == ComplaintStatus.RESOLVED) {
                existingComplaint.setResolvedDate(LocalDateTime.now());
            }

            return complaintRepository.save(existingComplaint);
        }

        return null;
    }

    @Override
    public void deleteComplaint(Integer complaintId) {

        complaintRepository.deleteById(complaintId);

    }

    @Override
    public List<Complaint> getComplaintsByStatus(ComplaintStatus status) {

        return complaintRepository.findByStatus(status);

    }

    @Override
    public List<Complaint> getComplaintsByCategory(ComplaintCategory category) {

        return complaintRepository.findByCategory(category);

    }

	

}