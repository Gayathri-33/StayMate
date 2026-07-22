package com.staymate.dto;

import java.time.LocalDateTime;

public class RoomShiftRequestDTO {
    private Long id;
    private String residentName;
    private String residentCode;
    private String oldRoomNumber;
    private String newRoomNumber;
    private String reasonLeaving;
    private String reasonWanted;
    private String status;
    private LocalDateTime requestedAt;

    public RoomShiftRequestDTO(Long id, String residentName, String residentCode, String oldRoomNumber,
                                String newRoomNumber, String reasonLeaving, String reasonWanted,
                                String status, LocalDateTime requestedAt) {
        this.id = id;
        this.residentName = residentName;
        this.residentCode = residentCode;
        this.oldRoomNumber = oldRoomNumber;
        this.newRoomNumber = newRoomNumber;
        this.reasonLeaving = reasonLeaving;
        this.reasonWanted = reasonWanted;
        this.status = status;
        this.requestedAt = requestedAt;
    }

    public Long getId() { return id; }
    public String getResidentName() { return residentName; }
    public String getResidentCode() { return residentCode; }
    public String getOldRoomNumber() { return oldRoomNumber; }
    public String getNewRoomNumber() { return newRoomNumber; }
    public String getReasonLeaving() { return reasonLeaving; }
    public String getReasonWanted() { return reasonWanted; }
    public String getStatus() { return status; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
}