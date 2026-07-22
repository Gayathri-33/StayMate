package com.staymate.service;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomShiftService {

    private final ResidentRepository residentRepository;
    private final RoomShiftRequestRepository roomShiftRequestRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final NotificationRepository notificationRepository;

    public RoomShiftService(ResidentRepository residentRepository,
                             RoomShiftRequestRepository roomShiftRequestRepository,
                             RoomRepository roomRepository, BedRepository bedRepository,
                             NotificationRepository notificationRepository) {
        this.residentRepository = residentRepository;
        this.roomShiftRequestRepository = roomShiftRequestRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.notificationRepository = notificationRepository;
    }

    // ---------- RESIDENT SIDE ----------

    public RoomShiftRequest requestShift(Long userId, RoomShiftCreateRequest req) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Bed currentBed = findCurrentBed(resident);
        if (currentBed == null) {
            throw new RuntimeException("No current bed found for this resident");
        }

        Room newRoom = roomRepository.findById(req.getNewRoomId())
                .orElseThrow(() -> new RuntimeException("Requested room not found"));

        if (newRoom.getAvailableBeds() <= 0) {
            throw new RuntimeException("Requested room has no available beds");
        }

        RoomShiftRequest shift = new RoomShiftRequest();
        shift.setResident(resident);
        shift.setOldRoom(currentBed.getRoom());
        shift.setNewRoom(newRoom);
        shift.setReasonLeaving(req.getReasonLeaving());
        shift.setReasonWanted(req.getReasonWanted());
        shift.setStatus(RoomShiftStatus.PENDING);
        shift = roomShiftRequestRepository.save(shift);

        if (resident.getHostel().getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
            notif.setMessage(resident.getUser().getFullName() + " requested a room shift from " +
                    currentBed.getRoom().getRoomNumber() + " to " + newRoom.getRoomNumber());
            notificationRepository.save(notif);
        }

        return shift;
    }

    public List<RoomShiftRequestDTO> getMyRequests(Long userId) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        return roomShiftRequestRepository.findByResident_ResidentId(resident.getResidentId()).stream()
                .map(this::toDTO)
                .toList();
    }

    // ---------- ADMIN SIDE ----------

    public List<RoomShiftRequestDTO> getRequestsForHostel(Long hostelId, RoomShiftStatus status) {
        return roomShiftRequestRepository.findByResident_Hostel_HostelIdAndStatus(hostelId, status).stream()
                .map(this::toDTO)
                .toList();
    }

    public void approveShift(Long shiftId) {
        RoomShiftRequest shift = roomShiftRequestRepository.findById(shiftId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (shift.getStatus() != RoomShiftStatus.PENDING) {
            throw new RuntimeException("This request has already been processed");
        }

        Resident resident = shift.getResident();
        Bed oldBed = findCurrentBed(resident);
        Room oldRoom = shift.getOldRoom();
        Room newRoom = shift.getNewRoom();

        if (newRoom.getAvailableBeds() <= 0) {
            throw new RuntimeException("No beds available in the requested room anymore");
        }

        // find a vacant bed in the new room
        Bed newBed = bedRepository.findByRoom_RoomIdAndStatus(newRoom.getRoomId(), BedStatus.VACANT)
                .stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No vacant bed found in the new room"));

        // vacate old bed
        if (oldBed != null) {
            oldBed.setStatus(BedStatus.VACANT);
            oldBed.setResident(null);
            bedRepository.save(oldBed);

            oldRoom.setOccupiedBeds(oldRoom.getOccupiedBeds() - 1);
            oldRoom.setAvailableBeds(oldRoom.getAvailableBeds() + 1);
            roomRepository.save(oldRoom);
        }

        // occupy new bed
        newBed.setStatus(BedStatus.OCCUPIED);
        newBed.setResident(resident);
        bedRepository.save(newBed);

        newRoom.setOccupiedBeds(newRoom.getOccupiedBeds() + 1);
        newRoom.setAvailableBeds(newRoom.getAvailableBeds() - 1);
        roomRepository.save(newRoom);

        shift.setStatus(RoomShiftStatus.APPROVED);
        roomShiftRequestRepository.save(shift);
    }

    public void rejectShift(Long shiftId) {
        RoomShiftRequest shift = roomShiftRequestRepository.findById(shiftId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (shift.getStatus() != RoomShiftStatus.PENDING) {
            throw new RuntimeException("This request has already been processed");
        }

        shift.setStatus(RoomShiftStatus.REJECTED);
        roomShiftRequestRepository.save(shift);
    }

    // ---------- helpers ----------

    private Bed findCurrentBed(Resident resident) {
        for (Room r : roomRepository.findByHostel_HostelId(resident.getHostel().getHostelId())) {
            for (Bed b : bedRepository.findByRoom_RoomId(r.getRoomId())) {
                if (b.getResident() != null && b.getResident().getResidentId().equals(resident.getResidentId())) {
                    return b;
                }
            }
        }
        return null;
    }

    private RoomShiftRequestDTO toDTO(RoomShiftRequest s) {
        return new RoomShiftRequestDTO(
                s.getId(), s.getResident().getUser().getFullName(), s.getResident().getResidentCode(),
                s.getOldRoom() != null ? s.getOldRoom().getRoomNumber() : null,
                s.getNewRoom() != null ? s.getNewRoom().getRoomNumber() : null,
                s.getReasonLeaving(), s.getReasonWanted(), s.getStatus().name(), s.getRequestedAt()
        );
    }
}