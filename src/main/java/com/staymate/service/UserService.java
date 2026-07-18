package com.staymate.service;

import java.util.List;

import com.staymate.dto.UserDTO;
import com.staymate.entity.User;

public interface UserService {

    User addUser(UserDTO userDTO);

    List<User> getAllUsers();

    User getUserById(Integer id);

    User updateUser(Integer id, UserDTO userDTO);

    void deleteUser(Integer id);

}