package com.staymate.service;

import com.staymate.dto.LoginDTO;
import com.staymate.dto.LoginResponseDTO;
import com.staymate.dto.LoginDTO;

public interface AuthService {

	LoginResponseDTO login(LoginDTO dto);
}