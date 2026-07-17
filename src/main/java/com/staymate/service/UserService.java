package com.staymate.service;

import com.staymate.dto.LoginDTO;
import com.staymate.entity.User;

public interface UserService {

    User login(LoginDTO loginDTO);

}