package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Hostel;
import com.staymate.enums.Status;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

    List<Hostel> findByStatus(Status status);

}