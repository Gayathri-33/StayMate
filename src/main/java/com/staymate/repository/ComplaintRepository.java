package com.staymate.repository;
import com.staymate.entity.Complaint;
import com.staymate.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByResident_ResidentId(Long residentId);
    List<Complaint> findByResident_Hostel_HostelIdAndStatus(Long hostelId, ComplaintStatus status);
    List<Complaint> findByResident_Hostel_HostelId(Long hostelId);
}