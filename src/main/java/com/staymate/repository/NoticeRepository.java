package com.staymate.repository;
import com.staymate.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByHostel_HostelIdOrderByCreatedAtDesc(Long hostelId);
}