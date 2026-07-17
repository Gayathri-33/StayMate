package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.User;

public interface ResidentRepository extends JpaRepository<User, Integer> {

}
