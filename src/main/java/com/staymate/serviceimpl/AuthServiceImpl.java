package com.staymate.serviceimpl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.staymate.dto.LoginDTO;
import com.staymate.dto.LoginResponseDTO;
import com.staymate.entity.User;
import com.staymate.enums.Status;
import com.staymate.exception.InvalidRequestException;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.UserRepository;
import com.staymate.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
	
    @Override
    public LoginResponseDTO login(LoginDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        if (user.getStatus() != Status.ACTIVE) {
            throw new InvalidRequestException("Your account is awaiting admin approval.");
        }

        return LoginResponseDTO.builder()
                .message("Login successful")
                .role(user.getRole().name())
                .build();
    }

}