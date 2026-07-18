package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.staymate.entity.Hostel;

public interface HostelRepository extends JpaRepository<Hostel,Integer>{

}