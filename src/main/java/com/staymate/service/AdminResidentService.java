package com.staymate.service;

import com.staymate.dto.AdminResidentDTO;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminResidentService {

    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public AdminResidentService(ResidentRepository residentRepository, 
                                RoomRepository roomRepository, 
                                BedRepository bedRepository,
                                NotificationRepository notificationRepository,
                                EmailService emailService) {
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    public List<AdminResidentDTO> getAllResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelId(hostelId).stream().map(this::toDTO).toList();
    }

    public List<AdminResidentDTO> getPendingResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.PENDING).stream().map(this::toDTO).toList();
    }

    public List<AdminResidentDTO> getApprovedResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.ACTIVE).stream().map(this::toDTO).toList();
    }

    public List<AdminResidentDTO> getRejectedResidents(Long hostelId) {
        return residentRepository.findByHostel_HostelIdAndStatus(hostelId, ResidentStatus.REJECTED).stream().map(this::toDTO).toList();
    }

    public AdminResidentDTO getResidentDetail(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));
        return toDTO(resident);
    }

    @Transactional
    public void approveResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));

        if (resident.getStatus() != ResidentStatus.PENDING) {
            throw new RuntimeException("Resident is not in pending status");
        }

        Bed bed = resident.getBed();
        if (bed == null) {
            throw new RuntimeException("No bed assigned to this resident.");
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
    }

    @Transactional
    public void rejectResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));

        Bed bed = resident.getBed();
        if (bed != null && bed.getStatus() == BedStatus.OCCUPIED) {
            bed.setStatus(BedStatus.VACANT);
            bed.setResident(null);
            bedRepository.save(bed);

            Room room = bed.getRoom();
            room.setAvailableBeds(room.getAvailableBeds() + 1);
            room.setOccupiedBeds(Math.max(0, room.getOccupiedBeds() - 1));
            roomRepository.save(room);
        }

        resident.setStatus(ResidentStatus.REJECTED);
        residentRepository.save(resident);
    }

    @Transactional
    public void blockResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));
        resident.setStatus(ResidentStatus.BLOCKED);
        residentRepository.save(resident);
    }

    @Transactional
    public void unblockResident(Long residentId) {
        Resident resident = residentRepository.findById(residentId)
            .orElseThrow(() -> new RuntimeException("Resident not found"));
        resident.setStatus(ResidentStatus.ACTIVE);
        residentRepository.save(resident);
    }

    private AdminResidentDTO toDTO(Resident resident) {
        String roomNumber = null;
        String bedNumber = null;
        if (resident.getBed() != null) {
            bedNumber = resident.getBed().getBedNumber();
            if (resident.getBed().getRoom() != null) {
                roomNumber = resident.getBed().getRoom().getRoomNumber();
            }
        }
        return new AdminResidentDTO(
                resident.getResidentId(), resident.getResidentCode(), resident.getUser().getFullName(),
                resident.getUser().getEmail(), resident.getUser().getPhone(), resident.getAddress(),
                roomNumber, bedNumber, resident.getStatus().name(), resident.getPaymentStatus().name(),
                resident.getRegistrationDate(), resident.getPaymentDueDate()
        );
    }
}