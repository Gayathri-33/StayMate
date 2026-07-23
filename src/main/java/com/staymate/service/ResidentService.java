package com.staymate.service;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.List;

@Service
public class ResidentService {

    private final UserRepository userRepository;
    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final ResidentRepository residentRepository;
    private final FeedbackRepository feedbackRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    private static final SecureRandom RANDOM = new SecureRandom();

    public ResidentService(UserRepository userRepository, HostelRepository hostelRepository,
                            RoomRepository roomRepository, BedRepository bedRepository,
                            ResidentRepository residentRepository, FeedbackRepository feedbackRepository,
                            NotificationRepository notificationRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.hostelRepository = hostelRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.residentRepository = residentRepository;
        this.feedbackRepository = feedbackRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------- HOSTEL SEARCH (public, pre-login) ----------

    public List<HostelSearchDTO> searchByPlace(String place) {
        return hostelRepository.findByPlaceContainingIgnoreCase(place).stream()
                .filter(h -> h.getStatus() == HostelStatus.APPROVED)
                .map(this::toSearchDTO)
                .toList();
    }

    public HostelSearchDTO searchByCode(String hostelCode) {
        Hostel h = hostelRepository.findByHostelCode(hostelCode)
                .filter(hh -> hh.getStatus() == HostelStatus.APPROVED)
                .orElseThrow(() -> new RuntimeException("Hostel code not found"));
        return toSearchDTO(h);
    }

    private HostelSearchDTO toSearchDTO(Hostel h) {
        return new HostelSearchDTO(h.getHostelId(), h.getHostelCode(), h.getHostelName(), h.getPlace(),
                h.getHostelType().name(), h.getFeeAmount(), h.getFeeCycle().name(), h.getTotalRooms());
    }

    public List<RoomDTO> getAvailableRooms(String hostelCode) {
        return roomRepository.findByHostel_HostelCode(hostelCode).stream()
                .filter(r -> r.getAvailableBeds() > 0)
                .map(r -> new RoomDTO(r.getRoomId(), r.getRoomNumber(), r.getCapacity(),
                        r.getOccupiedBeds(), r.getAvailableBeds(), hostelCode))
                .toList();
    }

    public List<BedDTO> getAvailableBeds(Long roomId) {
        return bedRepository.findByRoom_RoomIdAndStatus(roomId, BedStatus.VACANT).stream()
                .map(b -> new BedDTO(b.getBedId(), b.getBedNumber(), b.getStatus().name(),
                        b.getRoom().getRoomId(), b.getRoom().getRoomNumber(), null, null))
                .toList();
    }

    // ---------- REGISTRATION ----------

    public User register(ResidentRegisterRequest req) {
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Hostel hostel = hostelRepository.findByHostelCode(req.getHostelCode())
            .orElseThrow(() -> new RuntimeException("Invalid hostel code"));

        Bed bed = bedRepository.findById(req.getBedId())
            .orElseThrow(() -> new RuntimeException("Selected bed not found"));

        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Selected bed is already occupied. Please choose another.");
        }

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.RESIDENT);
        user = userRepository.save(user);

        Resident resident = new Resident();
        resident.setUser(user);
        resident.setHostel(hostel);
        resident.setResidentCode(generateUniqueResidentCode());
        resident.setRegistrationDate(LocalDate.now());
        
        // Store selected bed info but DON'T occupy it yet
        resident.setBed(bed);  // Add bed field to Resident entity if not exists
        
        int bufferDays = hostel.getPaymentBufferDays() != null ? hostel.getPaymentBufferDays() : 3;
        resident.setPaymentDueDate(LocalDate.now().plusDays(bufferDays));
        
        // NEW: Status is PENDING until admin approves
        resident.setStatus(ResidentStatus.PENDING);
        resident.setPaymentStatus(PaymentStatus.PENDING);
        resident = residentRepository.save(resident);

        // Notify admin about new resident request
        if (hostel.getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(hostel.getAdmin().getUserId());
            notif.setMessage("New resident request from " + user.getFullName() + 
                " for Room " + bed.getRoom().getRoomNumber() + 
                ", Bed " + bed.getBedNumber() + ". Awaiting your approval.");
            notificationRepository.save(notif);
        }

        return user;
    }

    private String generateUniqueResidentCode() {
        String code;
        do {
            code = "RES" + (100000 + RANDOM.nextInt(900000));
        } while (residentRepository.findByResidentCode(code).isPresent());
        return code;
    }

    // ---------- DASHBOARD ----------

    public ResidentDashboardDTO getDashboard(Long userId) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Hostel hostel = resident.getHostel();

        // find the bed/room this resident occupies
        String roomNumber = null;
        String bedNumber = null;
        // scan hostel's rooms for the bed linked to this resident
        for (Room r : roomRepository.findByHostel_HostelId(hostel.getHostelId())) {
            for (Bed b : bedRepository.findByRoom_RoomId(r.getRoomId())) {
                if (b.getResident() != null && b.getResident().getResidentId().equals(resident.getResidentId())) {
                    roomNumber = r.getRoomNumber();
                    bedNumber = b.getBedNumber();
                }
            }
        }

        LocalDate feeExpiry = null;
        if (hostel.getFeeCycle() == FeeCycle.YEARLY && resident.getPaymentStatus() == PaymentStatus.PAID) {
            feeExpiry = resident.getRegistrationDate().plusYears(1);
        }

        return new ResidentDashboardDTO(
                resident.getUser().getFullName(), resident.getResidentCode(),
                hostel.getHostelName(), hostel.getHostelCode(),
                roomNumber, bedNumber,
                resident.getStatus().name(), resident.getPaymentStatus().name(),
                resident.getPaymentDueDate(), hostel.getFeeAmount(), hostel.getFeeCycle().name(),
                feeExpiry
        );
    }

    // ---------- FEEDBACK ----------

    public Feedback submitFeedback(Long userId, FeedbackRequest req) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Feedback fb = new Feedback();
        fb.setResident(resident);
        fb.setRating(req.getRating());
        fb.setComments(req.getComments());
        return feedbackRepository.save(fb);
    }
}