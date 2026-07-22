package com.staymate.dto;

public class RoomDTO {

    private String roomNumber;
    private String roomType;
    private Integer capacity;
    private String hostelCode;

    public RoomDTO() {
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getHostelCode() {
        return hostelCode;
    }

    public void setHostelCode(String hostelCode) {
        this.hostelCode = hostelCode;
    }
}