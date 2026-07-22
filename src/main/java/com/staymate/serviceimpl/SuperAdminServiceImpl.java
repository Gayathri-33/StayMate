package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.enums.Role;
import com.staymate.enums.Status;
import com.staymate.entity.User;
import com.staymate.repository.UserRepository;
import com.staymate.service.SuperAdminService;

@Service
public class SuperAdminServiceImpl implements SuperAdminService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addAdmin(User user) {

        user.setRole(Role.ADMIN);
        user.setStatus(Status.ACTIVE);

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllAdmins() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .toList();
    }

    @Override
    public User getAdminById(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateAdmin(Long id, User user) {

        User existingAdmin = userRepository.findById(id).orElse(null);

        if (existingAdmin != null) {

            existingAdmin.setFullName(user.getFullName());
            existingAdmin.setEmail(user.getEmail());
            existingAdmin.setPhone(user.getPhone());

            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existingAdmin.setPassword(user.getPassword());
            }
            return userRepository.save(existingAdmin);
        }

        return null;
    }

    @Override
    public void deleteAdmin(Long id) {

        userRepository.deleteById(id);
    }
}