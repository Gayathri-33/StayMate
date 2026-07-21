package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.LoginDTO;
import com.staymate.entity.User;
import com.staymate.repository.UserRepository;
import com.staymate.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String login(LoginDTO loginDTO) {

        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            return "Invalid Password";
        }

        return "Login Successful";

    }

}