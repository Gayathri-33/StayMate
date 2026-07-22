package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Bed;
import com.staymate.enums.Status;

public interface BedRepository extends JpaRepository<Bed, Long> {

    List<Bed> findByStatus(Status status);

    List<Bed> findByRoomNumber(String roomNumber);

    List<Bed> findByHostelCode(String hostelCode);

}