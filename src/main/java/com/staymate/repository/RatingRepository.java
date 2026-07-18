package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Rating;
import com.staymate.entity.Student;

public interface RatingRepository extends JpaRepository<Rating,Integer>{

    List<Rating> findByStudent(Student student);

}