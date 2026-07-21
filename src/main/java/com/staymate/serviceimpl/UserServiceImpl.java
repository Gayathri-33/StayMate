package com.staymate.serviceimpl;

import org.springframework.stereotype.Service;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.enums.Status;
import com.staymate.repository.UserRepository;
import com.staymate.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // Later you'll also inject:
    // private final HostelRepository hostelRepository;
    // private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String registerResident(ResidentRegisterRequestDTO request) {

        // Step 1: Check email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered";
        }

        // Step 2: Create User
        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        // Temporary (until PasswordEncoder is added)
        user.setPassword(request.getPassword());

        user.setRole(Role.STUDENT);
        user.setStatus(Status.PENDING);

        // TODO:
        // Validate hostel code
        // user.setHostel(hostel);

        userRepository.save(user);

        return "Registration request submitted successfully. Awaiting admin approval.";
    }
}