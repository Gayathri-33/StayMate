package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.RoomShiftRequest;
import com.staymate.entity.Student;
import com.staymate.enums.RequestStatus;

public interface RoomShiftRepository extends JpaRepository<RoomShiftRequest,Integer>{

    List<RoomShiftRequest> findByStudent(Student student);

    List<RoomShiftRequest> findByStatus(RequestStatus status);

}