package com.staymate.repository;
import com.staymate.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByResident_Hostel_HostelId(Long hostelId);
}