package com.staymate.service;

import java.util.List;

import com.staymate.entity.User;

public interface SuperAdminService {

    User addAdmin(User user);

    List<User> getAllAdmins();

    User getAdminById(Long id);

    User updateAdmin(Long id, User user);

    void deleteAdmin(Long id);

}