package com.staymate.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.enums.Status;
import com.staymate.repository.UserRepository;
import com.staymate.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public String registerResident(ResidentRegisterRequestDTO request) {

        // TODO: Validate hostel code once Hostel module is available

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword()) // Encrypt later with BCrypt
                .role(Role.STUDENT)
                .status(Status.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "Registration request submitted successfully. Awaiting admin approval.";
    }
}