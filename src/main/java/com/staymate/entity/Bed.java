package com.staymate.entity;

import com.staymate.enums.BedStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "beds")
public class Bed {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bedId;

    private String bedNumber;

    @Enumerated(EnumType.STRING)
    private BedStatus status = BedStatus.VACANT;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToOne
    @JoinColumn(name = "resident_id")
    private Resident resident;

    // getters/setters
    public Long getBedId() { return bedId; }
    public void setBedId(Long bedId) { this.bedId = bedId; }
    public String getBedNumber() { return bedNumber; }
    public void setBedNumber(String bedNumber) { this.bedNumber = bedNumber; }
    public BedStatus getStatus() { return status; }
    public void setStatus(BedStatus status) { this.status = status; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public Resident getResident() { return resident; }
    public void setResident(Resident resident) { this.resident = resident; }
}