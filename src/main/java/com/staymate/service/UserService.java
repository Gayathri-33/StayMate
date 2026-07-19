package com.staymate.service;

import java.util.List;

import com.staymate.entity.User;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    void deleteUser(Long userId);

	User updateUser(Long userId, User user);

	User getUserById(Long userId);

}