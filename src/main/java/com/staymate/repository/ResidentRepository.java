package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Resident;
import com.staymate.entity.User;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Integer> {
	boolean existsByUser(User user);
}