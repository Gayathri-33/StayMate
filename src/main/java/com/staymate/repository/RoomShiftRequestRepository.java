package com.staymate.repository;
import com.staymate.entity.RoomShiftRequest;
import com.staymate.enums.RoomShiftStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomShiftRequestRepository extends JpaRepository<RoomShiftRequest, Long> {
    List<RoomShiftRequest> findByResident_ResidentId(Long residentId);
    List<RoomShiftRequest> findByResident_Hostel_HostelIdAndStatus(Long hostelId, RoomShiftStatus status);
}