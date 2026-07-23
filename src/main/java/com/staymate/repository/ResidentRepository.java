package com.staymate.repository;
import com.staymate.entity.Resident;
import com.staymate.enums.ResidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> findByUser_UserId(Long userId);
    List<Resident> findByHostel_HostelId(Long hostelId);
    List<Resident> findByStatus(ResidentStatus status);
    List<Resident> findByStatusAndPaymentDueDateBefore(ResidentStatus status, LocalDate date);
    Optional<Resident> findByResidentCode(String residentCode);
    List<Resident> findByHostel_HostelIdAndStatus(Long hostelId, ResidentStatus status);
}