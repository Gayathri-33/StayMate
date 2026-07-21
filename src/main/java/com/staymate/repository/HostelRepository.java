package com.staymate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.staymate.entity.Hostel;
import com.staymate.entity.User;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

    Optional<Hostel> findByHostelCode(String hostelCode);
    
    List<Hostel> findByAdmin(User admin);

    boolean existsByHostelCode(String hostelCode);

}
