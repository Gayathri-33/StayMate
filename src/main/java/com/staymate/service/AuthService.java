package com.staymate.service;

import com.staymate.dto.LoginDTO;
import com.staymate.dto.LoginResponseDTO;
import com.staymate.dto.RegisterDTO;

public interface AuthService {

    String register(RegisterDTO dto);

    LoginResponseDTO login(LoginDTO dto);

}