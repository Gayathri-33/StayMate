package com.staymate.service;

import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminResidentService {
    
    private final ResidentRepository residentRepository;
    private final BedRepository bedRepository;
    private final RoomRepository roomRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public AdminResidentService(ResidentRepository residentRepository, 
                                BedRepository bedRepository,
                                RoomRepository roomRepository,
                                NotificationRepository notificationRepository,
                                EmailService emailService) {
        this.residentRepository = residentRepository;
        this.bedRepository = bedRepository;
        this.roomRepository = roomRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    public List<Resident> getPendingResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.PENDING);
    }

    public void approveResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));
        
        if (resident.getStatus() != ResidentStatus.PENDING) {
            throw new RuntimeException("Resident is not in pending status");
        }
        
        // Get the bed they requested
        Bed bed = resident.getBed();
        
        // Double-check bed is still available
        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Bed is no longer available. Please assign a different bed.");
        }
        
        // NOW occupy the bed
        bed.setStatus(BedStatus.OCCUPIED);
        bed.setResident(resident);
        bedRepository.save(bed);
        
        // Update room counts
        Room room = bed.getRoom();
        room.setOccupiedBeds(room.getOccupiedBeds() + 1);
        room.setAvailableBeds(room.getAvailableBeds() - 1);
        roomRepository.save(room);
        
        // Update resident status to PENDING_PAYMENT
        resident.setStatus(ResidentStatus.PENDING_PAYMENT);
        residentRepository.save(resident);
        
        // Notify resident
        emailService.send(
            resident.getUser().getEmail(),
            "StayMate - Registration Approved!",
            "Hi " + resident.getUser().getFullName() + ",\n\n" +
            "Your hostel registration has been approved!\n" +
            "Room: " + room.getRoomNumber() + ", Bed: " + bed.getBedNumber() + "\n" +
            "Please complete your payment by " + resident.getPaymentDueDate() + "\n\n" +
            "- StayMate Team"
        );
        
        // Notify admin
        Notification notif = new Notification();
        notif.setRecipientRole(Role.ADMIN);
        notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
        notif.setMessage(resident.getUser().getFullName() +
            " has been approved and assigned Room " + room.getRoomNumber() +
            ", Bed " + bed.getBedNumber() + ". Awaiting payment.");
        notificationRepository.save(notif);
    }

    public void rejectResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));

        if (resident.getStatus() != ResidentStatus.PENDING) {
            throw new RuntimeException("Resident is not in pending status");
        }

        // Update status to REJECTED
        resident.setStatus(ResidentStatus.REJECTED);
        residentRepository.save(resident);

        // Notify resident
        emailService.send(
            resident.getUser().getEmail(),
            "StayMate - Registration Update",
            "Hi " + resident.getUser().getFullName() + ",\n\n" +
            "We regret to inform you that your hostel registration request was not approved.\n" +
            "Please contact the hostel admin for more information.\n\n" +
            "- StayMate Team"
        );

        // Notify admin
        Notification notif = new Notification();
        notif.setRecipientRole(Role.ADMIN);
        notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
        notif.setMessage(resident.getUser().getFullName() + 
            "'s registration request has been rejected.");
        notificationRepository.save(notif);
    }
}