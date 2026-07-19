package com.staymate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Resident;
import com.staymate.entity.RoomAllocation;

public interface RoomAllocationRepository extends JpaRepository<RoomAllocation, Integer> {

    Optional<RoomAllocation> findByResident(Resident resident);

    boolean existsByResident(Resident resident);
}