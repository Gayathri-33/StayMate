package com.staymate.repository;
import com.staymate.entity.Bed;
import com.staymate.enums.BedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByRoom_RoomId(Long roomId);
    List<Bed> findByRoom_RoomIdAndStatus(Long roomId, BedStatus status);
}