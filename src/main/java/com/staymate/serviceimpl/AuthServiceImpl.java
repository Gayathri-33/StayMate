package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.LoginDTO;
import com.staymate.dto.LoginResponseDTO;
import com.staymate.entity.User;
import com.staymate.repository.UserRepository;
import com.staymate.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public LoginResponseDTO login(LoginDTO loginDTO) {

        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String hostelCode = null;

        if(user.getRole().name().equals("ADMIN")) {

            hostelCode = user.getHostelCode();

        }

        return new LoginResponseDTO(
                "demo-token",
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                hostelCode
        );
    }

}