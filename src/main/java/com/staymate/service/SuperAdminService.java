package com.staymate.service;

import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class SuperAdminService {

    private final UserRepository userRepository;
    private final AdminProfileRepository adminProfileRepository;
    private final HostelRepository hostelRepository;
    private final ResidentRepository residentRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    private static final SecureRandom RANDOM = new SecureRandom();

    public SuperAdminService(UserRepository userRepository, AdminProfileRepository adminProfileRepository,
                              HostelRepository hostelRepository, ResidentRepository residentRepository,
                              NotificationRepository notificationRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.adminProfileRepository = adminProfileRepository;
        this.hostelRepository = hostelRepository;
        this.residentRepository = residentRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    // ---------- ADMINS ----------

    public List<AdminSummaryDTO> getAdminsByStatus(AdminStatus status) {
        return userRepository.findByRoleAndAdminStatus(Role.ADMIN, status).stream()
                .map(this::toAdminSummary)
                .toList();
    }

    private AdminSummaryDTO toAdminSummary(User u) {
        AdminProfile profile = adminProfileRepository.findByUser_UserId(u.getUserId());
        return new AdminSummaryDTO(
                u.getUserId(), u.getFullName(), u.getEmail(), u.getPhone(),
                profile != null ? profile.getAadharNo() : null,
                profile != null ? profile.getPanNo() : null,
                profile != null ? profile.getHostelAddress() : null,
                profile != null ? profile.getProposedRoomCount() : null,
                u.getAdminStatus().name()
        );
    }

    public void approveAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        user.setAdminStatus(AdminStatus.APPROVED);
        userRepository.save(user);

        emailService.send(user.getEmail(), "StayMate - Admin Account Approved",
                "Hi " + user.getFullName() + ",\n\nYour admin account has been approved. " +
                "You can now log in and register your hostel.\n\n- StayMate Team");
    }

    public void rejectAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        user.setAdminStatus(AdminStatus.REJECTED);
        userRepository.save(user);

        emailService.send(user.getEmail(), "StayMate - Admin Registration Rejected",
                "Hi " + user.getFullName() + ",\n\nYour admin registration request was not approved. " +
                "Please contact support for details.\n\n- StayMate Team");
    }

    // ---------- HOSTELS ----------

    public List<HostelSummaryDTO> getHostelsByStatus(HostelStatus status) {
        return hostelRepository.findByStatus(status).stream()
                .map(this::toHostelSummary)
                .toList();
    }

    private HostelSummaryDTO toHostelSummary(Hostel h) {
        return new HostelSummaryDTO(
                h.getHostelId(), h.getHostelCode(), h.getHostelName(), h.getPlace(),
                h.getHostelType() != null ? h.getHostelType().name() : null,
                h.getTotalRooms(), h.getStatus().name(), h.getFeeAmount(),
                h.getFeeCycle() != null ? h.getFeeCycle().name() : null,
                h.getAdmin() != null ? h.getAdmin().getFullName() : null,
                h.getAdmin() != null ? h.getAdmin().getEmail() : null
        );
    }

    public String approveHostel(Long hostelId) {
        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        String code = generateUniqueHostelCode(hostel.getHostelName(), hostel.getHostelType());
        hostel.setHostelCode(code);
        hostel.setStatus(HostelStatus.APPROVED);
        hostelRepository.save(hostel);

        if (hostel.getAdmin() != null) {
            emailService.send(hostel.getAdmin().getEmail(), "StayMate - Hostel Approved",
                    "Hi " + hostel.getAdmin().getFullName() + ",\n\nYour hostel \"" + hostel.getHostelName() +
                    "\" has been approved.\n\nYour Hostel Code is: " + code +
                    "\n\nShare this code with residents so they can register under your hostel." +
                    "\n\n- StayMate Team");
        }

        return code;
    }

    public void rejectHostel(Long hostelId) {
        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));

        hostel.setStatus(HostelStatus.REJECTED);
        hostelRepository.save(hostel);

        if (hostel.getAdmin() != null) {
            emailService.send(hostel.getAdmin().getEmail(), "StayMate - Hostel Registration Rejected",
                    "Hi " + hostel.getAdmin().getFullName() + ",\n\nYour hostel \"" + hostel.getHostelName() +
                    "\" registration was not approved. Please review your details and resubmit." +
                    "\n\n- StayMate Team");
        }
    }

    private String generateUniqueHostelCode(String hostelName, HostelType type) {
        String prefix = hostelName.replaceAll("[^a-zA-Z]", "");
        if (prefix.length() < 4) {
            prefix = (prefix + "XXXX").substring(0, 4);
        } else {
            prefix = prefix.substring(0, 4);
        }
        prefix = prefix.toUpperCase();

        String typeChar = switch (type) {
            case FEMALE -> "F";
            case MALE -> "M";
            case UNISEX -> "U";
        };

        String code;
        do {
            int digits = 1000 + RANDOM.nextInt(9000); // 4-digit number
            code = prefix + typeChar + digits;
        } while (hostelRepository.existsByHostelCode(code));

        return code;
    }

    // ---------- DASHBOARD ----------

    public DashboardStatsDTO getDashboardStats() {
        long totalAdmins = userRepository.findByRole(Role.ADMIN).size();
        long pendingAdmins = userRepository.findByRoleAndAdminStatus(Role.ADMIN, AdminStatus.PENDING).size();
        long totalHostels = hostelRepository.count();
        long pendingHostels = hostelRepository.findByStatus(HostelStatus.PENDING).size();
        long totalResidents = residentRepository.count();
        long unreadNotifications = notificationRepository
                .findByRecipientRoleOrderByCreatedAtDesc(Role.SUPER_ADMIN)
                .stream().filter(n -> !n.getIsRead()).count();

        return new DashboardStatsDTO(totalAdmins, pendingAdmins, totalHostels,
                pendingHostels, totalResidents, unreadNotifications);
    }

    // ---------- NOTIFICATIONS ----------

    public List<NotificationDTO> getNotifications() {
        return notificationRepository.findByRecipientRoleOrderByCreatedAtDesc(Role.SUPER_ADMIN)
                .stream()
                .map(n -> new NotificationDTO(n.getId(), n.getMessage(), n.getIsRead(), n.getCreatedAt()))
                .toList();
    }

    public void markNotificationRead(Long id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setIsRead(true);
        notificationRepository.save(n);
    }
}
