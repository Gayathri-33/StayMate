package com.staymate.repository;
import com.staymate.entity.Hostel;
import com.staymate.enums.HostelStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface HostelRepository extends JpaRepository<Hostel, Long> {
    List<Hostel> findByStatus(HostelStatus status);
    List<Hostel> findByAdmin_UserId(Long adminId);
    Optional<Hostel> findByHostelCode(String hostelCode);
    boolean existsByHostelCode(String hostelCode);
    List<Hostel> findByPlaceContainingIgnoreCase(String place);
}