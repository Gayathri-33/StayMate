package com.staymate.entity;

import com.staymate.enums.RoomShiftStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_shift_requests")
public class RoomShiftRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "resident_id")
    private Resident resident;

    @ManyToOne @JoinColumn(name = "old_room_id")
    private Room oldRoom;

    @ManyToOne @JoinColumn(name = "new_room_id")
    private Room newRoom;

    private String reasonLeaving;
    private String reasonWanted;

    @Enumerated(EnumType.STRING)
    private RoomShiftStatus status = RoomShiftStatus.PENDING;

    private LocalDateTime requestedAt = LocalDateTime.now();

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Resident getResident() { return resident; }
    public void setResident(Resident resident) { this.resident = resident; }
    public Room getOldRoom() { return oldRoom; }
    public void setOldRoom(Room oldRoom) { this.oldRoom = oldRoom; }
    public Room getNewRoom() { return newRoom; }
    public void setNewRoom(Room newRoom) { this.newRoom = newRoom; }
    public String getReasonLeaving() { return reasonLeaving; }
    public void setReasonLeaving(String reasonLeaving) { this.reasonLeaving = reasonLeaving; }
    public String getReasonWanted() { return reasonWanted; }
    public void setReasonWanted(String reasonWanted) { this.reasonWanted = reasonWanted; }
    public RoomShiftStatus getStatus() { return status; }
    public void setStatus(RoomShiftStatus status) { this.status = status; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
}