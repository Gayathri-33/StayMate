package com.staymate.dto;

public class RoomDTO {
    private Long roomId;
    private String roomNumber;
    private Integer capacity;
    private Integer occupiedBeds;
    private Integer availableBeds;
    private String hostelCode;

    public RoomDTO() {}

    public RoomDTO(Long roomId, String roomNumber, Integer capacity, Integer occupiedBeds,
                    Integer availableBeds, String hostelCode) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.occupiedBeds = occupiedBeds;
        this.availableBeds = availableBeds;
        this.hostelCode = hostelCode;
    }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Integer getOccupiedBeds() { return occupiedBeds; }
    public void setOccupiedBeds(Integer occupiedBeds) { this.occupiedBeds = occupiedBeds; }
    public Integer getAvailableBeds() { return availableBeds; }
    public void setAvailableBeds(Integer availableBeds) { this.availableBeds = availableBeds; }
    public String getHostelCode() { return hostelCode; }
    public void setHostelCode(String hostelCode) { this.hostelCode = hostelCode; }
}