package com.staymate.dto;

public class RoomShiftOptionDTO {
    private Long roomId;
    private String roomNumber;
    private Integer capacity;
    private Integer availableBeds;

    public RoomShiftOptionDTO(Long roomId, String roomNumber, Integer capacity, Integer availableBeds) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.availableBeds = availableBeds;
    }

    public Long getRoomId() { return roomId; }
    public String getRoomNumber() { return roomNumber; }
    public Integer getCapacity() { return capacity; }
    public Integer getAvailableBeds() { return availableBeds; }
}