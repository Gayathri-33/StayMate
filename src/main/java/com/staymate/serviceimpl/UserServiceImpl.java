package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.staymate.dto.ResidentRegisterRequestDTO;
import com.staymate.entity.Hostel;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.enums.Status;
import com.staymate.exception.ResourceAlreadyExistsException;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.HostelRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	@Autowired
    private final UserRepository userRepository;

	@Autowired
    private final HostelRepository hostelRepository;
	
	@Autowired
    private final PasswordEncoder passwordEncoder;

    
    @Override
    public String registerResident(ResidentRegisterRequestDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        Hostel hostel = hostelRepository.findByHostelCode(dto.getHostelCode())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid hostel code"));

        User user = User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .password(passwordEncoder.encode(dto.getPassword()))                .role(Role.STUDENT)
                .status(Status.PENDING)
                .hostel(hostel)
                .build();

        userRepository.save(user);

        return "Registration request submitted successfully.";
    }
}