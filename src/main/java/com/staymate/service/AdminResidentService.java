package com.staymate.service;

import com.staymate.dto.AdminResidentDTO;
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

    // ---------- LIST VIEWS ----------

    public List<AdminResidentDTO> getAllResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelId(hostelId).stream()
                .map(this::toDTO)
                .toList();
    }

    public List<AdminResidentDTO> getPendingResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.PENDING)
                .stream().map(this::toDTO).toList();
    }

    public List<AdminResidentDTO> getApprovedResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelId(hostelId).stream()
                .filter(r -> r.getStatus() == ResidentStatus.PENDING_PAYMENT
                          || r.getStatus() == ResidentStatus.ACTIVE
                          || r.getStatus() == ResidentStatus.BLOCKED)
                .map(this::toDTO)
                .toList();
    }

    public List<AdminResidentDTO> getRejectedResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.REJECTED)
                .stream().map(this::toDTO).toList();
    }

    public AdminResidentDTO getResidentDetail(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));
        return toDTO(resident);
    }

    // ---------- APPROVE / REJECT ----------

    public void approveResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        if (resident.getStatus() != ResidentStatus.PENDING) {
            throw new RuntimeException("Resident is not in pending status");
        }

        Bed bed = resident.getBed();
        if (bed == null) {
            throw new RuntimeException("No bed associated with this resident request");
        }
        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Bed is no longer available. Please assign a different bed.");
        }

        bed.setStatus(BedStatus.OCCUPIED);
        bed.setResident(resident);
        bedRepository.save(bed);

        Room room = bed.getRoom();
        room.setOccupiedBeds(room.getOccupiedBeds() + 1);
        room.setAvailableBeds(room.getAvailableBeds() - 1);
        roomRepository.save(room);

        resident.setStatus(ResidentStatus.PENDING_PAYMENT);
        residentRepository.save(resident);

        emailService.send(
                resident.getUser().getEmail(),
                "StayMate - Registration Approved!",
                "Hi " + resident.getUser().getFullName() + ",\n\n" +
                "Your hostel registration has been approved!\n" +
                "Room: " + room.getRoomNumber() + ", Bed: " + bed.getBedNumber() + "\n" +
                "Please complete your payment by " + resident.getPaymentDueDate() + "\n\n" +
                "- StayMate Team"
        );

        if (resident.getHostel().getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
            notif.setMessage(resident.getUser().getFullName() +
                    " has been approved and assigned Room " + room.getRoomNumber() +
                    ", Bed " + bed.getBedNumber() + ". Awaiting payment.");
            notificationRepository.save(notif);
        }
    }

    public void rejectResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        if (resident.getStatus() != ResidentStatus.PENDING) {
            throw new RuntimeException("Resident is not in pending status");
        }

        resident.setStatus(ResidentStatus.REJECTED);
        residentRepository.save(resident);

        emailService.send(
                resident.getUser().getEmail(),
                "StayMate - Registration Update",
                "Hi " + resident.getUser().getFullName() + ",\n\n" +
                "We regret to inform you that your hostel registration request was not approved.\n" +
                "Please contact the hostel admin for more information.\n\n" +
                "- StayMate Team"
        );

        if (resident.getHostel().getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
            notif.setMessage(resident.getUser().getFullName() +
                    "'s registration request has been rejected.");
            notificationRepository.save(notif);
        }
    }

    // ---------- BLOCK / UNBLOCK ----------

    public void blockResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        resident.setStatus(ResidentStatus.BLOCKED);
        residentRepository.save(resident);

        emailService.send(resident.getUser().getEmail(), "StayMate - Account Blocked",
                "Hi " + resident.getUser().getFullName() + ",\n\nYour account has been blocked by your hostel admin." +
                "\n\n- StayMate Team");
    }

    public void unblockResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        resident.setStatus(resident.getPaymentStatus() == PaymentStatus.PAID
                ? ResidentStatus.ACTIVE : ResidentStatus.PENDING_PAYMENT);
        residentRepository.save(resident);

        emailService.send(resident.getUser().getEmail(), "StayMate - Account Reactivated",
                "Hi " + resident.getUser().getFullName() + ",\n\nYour account has been reactivated." +
                "\n\n- StayMate Team");
    }

    // ---------- helper ----------

    private AdminResidentDTO toDTO(Resident resident) {
        Bed bed = resident.getBed();

        return new AdminResidentDTO(
                resident.getResidentId(), resident.getResidentCode(),
                resident.getUser().getFullName(), resident.getUser().getEmail(), resident.getUser().getPhone(),
                resident.getAddress(),
                bed != null ? bed.getRoom().getRoomNumber() : null,
                bed != null ? bed.getBedNumber() : null,
                resident.getStatus().name(), resident.getPaymentStatus().name(),
                resident.getRegistrationDate(), resident.getPaymentDueDate()
        );
    }
}