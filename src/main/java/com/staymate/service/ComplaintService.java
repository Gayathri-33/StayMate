package com.staymate.service;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    private final ResidentRepository residentRepository;
    private final ComplaintRepository complaintRepository;
    private final BedRepository bedRepository;
    private final RoomRepository roomRepository;
    private final NotificationRepository notificationRepository;

    public ComplaintService(ResidentRepository residentRepository, ComplaintRepository complaintRepository,
                             BedRepository bedRepository, RoomRepository roomRepository,
                             NotificationRepository notificationRepository) {
        this.residentRepository = residentRepository;
        this.complaintRepository = complaintRepository;
        this.bedRepository = bedRepository;
        this.roomRepository = roomRepository;
        this.notificationRepository = notificationRepository;
    }

    // ---------- RESIDENT SIDE ----------

    public Complaint raiseComplaint(Long userId, ComplaintRequest req) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Complaint complaint = new Complaint();
        complaint.setResident(resident);
        complaint.setTitle(req.getTitle());
        complaint.setDescription(req.getDescription());
        complaint = complaintRepository.save(complaint);

        notifyAdmin(resident, resident.getUser().getFullName() + " raised a complaint: \"" + req.getTitle() + "\"");

        return complaint;
    }

    public List<ComplaintDTO> getMyComplaints(Long userId) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        return complaintRepository.findByResident_ResidentId(resident.getResidentId()).stream()
                .map(c -> toDTO(c, findRoomNumber(resident)))
                .toList();
    }

    // ---------- ADMIN SIDE ----------

    public List<ComplaintDTO> getComplaintsForHostel(Long hostelId, ComplaintStatus status) {
        List<Complaint> complaints = status == null
                ? complaintRepository.findByResident_Hostel_HostelId(hostelId)
                : complaintRepository.findByResident_Hostel_HostelIdAndStatus(hostelId, status);

        return complaints.stream()
                .map(c -> toDTO(c, findRoomNumber(c.getResident())))
                .toList();
    }

    public void resolveComplaint(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setResolvedAt(LocalDateTime.now());
        complaintRepository.save(complaint);
    }

    // ---------- helpers ----------

    private String findRoomNumber(Resident resident) {
        for (Room r : roomRepository.findByHostel_HostelId(resident.getHostel().getHostelId())) {
            for (Bed b : bedRepository.findByRoom_RoomId(r.getRoomId())) {
                if (b.getResident() != null && b.getResident().getResidentId().equals(resident.getResidentId())) {
                    return r.getRoomNumber();
                }
            }
        }
        return null;
    }

    private ComplaintDTO toDTO(Complaint c, String roomNumber) {
        return new ComplaintDTO(
                c.getComplaintId(), c.getTitle(), c.getDescription(), c.getStatus().name(),
                c.getResident().getUser().getFullName(), c.getResident().getResidentCode(),
                roomNumber, c.getCreatedAt(), c.getResolvedAt()
        );
    }

    private void notifyAdmin(Resident resident, String message) {
        if (resident.getHostel().getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
            notif.setMessage(message);
            notificationRepository.save(notif);
        }
    }
}