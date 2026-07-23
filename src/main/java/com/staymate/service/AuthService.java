package com.staymate.service;

import com.staymate.dto.AdminRegisterRequest;
import com.staymate.dto.LoginRequest;
import com.staymate.dto.LoginResponse;
import com.staymate.entity.AdminProfile;
import com.staymate.entity.Notification;
import com.staymate.entity.Resident;
import com.staymate.entity.User;
import com.staymate.enums.AdminStatus;
import com.staymate.enums.ResidentStatus;
import com.staymate.enums.Role;
import com.staymate.repository.AdminProfileRepository;
import com.staymate.repository.NotificationRepository;
import com.staymate.repository.ResidentRepository; // <-- ADDED THIS IMPORT
import com.staymate.repository.UserRepository;
import com.staymate.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AdminProfileRepository adminProfileRepository;
    private final ResidentRepository residentRepository; // <-- ADDED THIS FIELD
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // <-- ADDED ResidentRepository TO CONSTRUCTOR
    public AuthService(UserRepository userRepository, 
                       AdminProfileRepository adminProfileRepository,
                       ResidentRepository residentRepository, 
                       NotificationRepository notificationRepository,
                       PasswordEncoder passwordEncoder, 
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.adminProfileRepository = adminProfileRepository;
        this.residentRepository = residentRepository; // <-- ADDED THIS ASSIGNMENT
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User registerAdmin(AdminRegisterRequest req) {
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.ADMIN);
        user.setAdminStatus(AdminStatus.PENDING);
        user = userRepository.save(user);

        AdminProfile profile = new AdminProfile();
        profile.setUser(user);
        profile.setAadharNo(req.getAadharNo());
        profile.setPanNo(req.getPanNo());
        profile.setHostelAddress(req.getHostelAddress());
        profile.setProposedRoomCount(req.getRoomCount());
        adminProfileRepository.save(profile);

        Notification notif = new Notification();
        notif.setRecipientRole(Role.SUPER_ADMIN);
        notif.setMessage("New admin request from " + user.getFullName() + " (" + user.getEmail() + ")");
        notificationRepository.save(notif);

        return user;
    }

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Check Admin Status
        if (user.getRole() == Role.ADMIN) {
            if (user.getAdminStatus() == AdminStatus.PENDING) {
                throw new RuntimeException("Your admin account is awaiting Super Admin approval.");
            }
            if (user.getAdminStatus() == AdminStatus.REJECTED) {
                throw new RuntimeException("Your admin registration was rejected.");
            }
        }

        // Check Resident Status
        if (user.getRole() == Role.RESIDENT) {
            Resident resident = residentRepository.findByUser_UserId(user.getUserId()).orElse(null);
            
            if (resident != null) {
                if (resident.getStatus() == ResidentStatus.PENDING) {
                    throw new RuntimeException("Your registration is awaiting admin approval. Please wait.");
                }
                if (resident.getStatus() == ResidentStatus.REJECTED) {
                    throw new RuntimeException("Your registration was rejected. Please contact the hostel admin.");
                }
                if (resident.getStatus() == ResidentStatus.BLOCKED) {
                    throw new RuntimeException("Your account is blocked due to overdue payment. Contact admin.");
                }
            }
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getUserId());
        String adminStatus = user.getAdminStatus() != null ? user.getAdminStatus().name() : null;

        return new LoginResponse(
                token, 
                user.getUserId(), 
                user.getFullName(), 
                user.getEmail(),
                user.getRole().name(), 
                adminStatus, 
                null // hostelCode filled in Phase 3/4 lookups
        );
    }
}