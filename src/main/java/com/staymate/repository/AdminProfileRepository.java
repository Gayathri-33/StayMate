package com.staymate.repository;

import com.staymate.entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminProfileRepository extends JpaRepository<AdminProfile, Long> {
    AdminProfile findByUser_UserId(Long userId);
}