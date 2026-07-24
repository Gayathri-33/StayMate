package com.staymate.repository;
import com.staymate.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHostel_HostelId(Long hostelId);
    List<Room> findByHostel_HostelCode(String hostelCode);
    List<Room> findByHostel_HostelIdAndAvailableBedsGreaterThan(Long hostelId, int availableBeds);
}