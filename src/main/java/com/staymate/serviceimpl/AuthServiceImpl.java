package com.staymate.serviceimpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.staymate.dto.LoginDTO;
import com.staymate.dto.LoginResponseDTO;
import com.staymate.dto.RegisterDTO;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.enums.Status;
import com.staymate.repository.UserRepository;
import com.staymate.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String register(RegisterDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            return "Email already exists";
        }

        User user = new User();

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        // Encrypt password
        user.setPassword(encoder.encode(dto.getPassword()));

        // Default Role
        user.setRole(Role.STUDENT);

        // Default Status
        user.setStatus(Status.ACTIVE);

        userRepository.save(user);

        return "Registration Successful";
    }

    @Override
    public LoginResponseDTO login(LoginDTO dto) {

    	
        Optional<User> optional = userRepository.findByEmail(dto.getEmail());

        if (optional.isEmpty()) {
            throw new RuntimeException("Invalid Email");
        }

        User user = optional.get();

        if (!encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponseDTO();
    }

}