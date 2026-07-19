package com.staymate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Student;
import com.staymate.entity.User;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByUserUserId(Long userId);

    boolean existsByUser(User user);
    
}