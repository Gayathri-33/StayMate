package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Resident;
import com.staymate.enums.Status;

public interface ResidentRepository extends JpaRepository<Resident, Long> {

    List<Resident> findByStatus(Status status);

}