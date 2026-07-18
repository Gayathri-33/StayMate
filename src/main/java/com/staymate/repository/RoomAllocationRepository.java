package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.RoomAllocation;

@Repository
public interface RoomAllocationRepository extends JpaRepository<RoomAllocation,Integer>{

}