package com.staymate.serviceimpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.LoginDTO;
import com.staymate.entity.User;
import com.staymate.repository.UserRepository;
import com.staymate.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(LoginDTO loginDTO) {

        return null;
    }

}