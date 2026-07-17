package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Hostel;

@Repository
public interface HostelRepository extends JpaRepository<Hostel, Long> {

}