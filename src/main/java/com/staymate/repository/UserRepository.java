package com.staymate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}