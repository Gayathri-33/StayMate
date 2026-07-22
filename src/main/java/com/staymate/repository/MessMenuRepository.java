package com.staymate.repository;
import com.staymate.entity.MessMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessMenuRepository extends JpaRepository<MessMenu, Long> {
    List<MessMenu> findByHostel_HostelId(Long hostelId);
}