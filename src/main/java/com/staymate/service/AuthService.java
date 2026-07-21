package com.staymate.service;

import com.staymate.dto.LoginDTO;

public interface AuthService {

    String login(LoginDTO loginDTO);

}