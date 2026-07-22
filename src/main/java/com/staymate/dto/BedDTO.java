package com.staymate.dto;

public class BedDTO {
    private Long bedId;
    private String bedNumber;
    private String status;
    private Long roomId;
    private String roomNumber;
    private String residentName;
    private String residentCode;

    public BedDTO(Long bedId, String bedNumber, String status, Long roomId,
                   String roomNumber, String residentName, String residentCode) {
        this.bedId = bedId;
        this.bedNumber = bedNumber;
        this.status = status;
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.residentName = residentName;
        this.residentCode = residentCode;
    }

    public Long getBedId() { return bedId; }
    public String getBedNumber() { return bedNumber; }
    public String getStatus() { return status; }
    public Long getRoomId() { return roomId; }
    public String getRoomNumber() { return roomNumber; }
    public String getResidentName() { return residentName; }
    public String getResidentCode() { return residentCode; }
}