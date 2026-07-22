package com.staymate.dto;

public class RoomDTO {

	private String roomNumber;
    private String roomType;
    private Integer capacity;
    private Integer occupiedBeds;
    private Integer availableBeds;
    private String hostelCode;

    public RoomDTO() {}

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

	public Integer getOccupiedBeds() {
		return occupiedBeds;
	}

	public void setOccupiedBeds(Integer occupiedBeds) {
		this.occupiedBeds = occupiedBeds;
	}

	public Integer getAvailableBeds() {
		return availableBeds;
	}

	public void setAvailableBeds(Integer availableBeds) {
		this.availableBeds = availableBeds;
	}

	public String getHostelCode() {
		return hostelCode;
	}

	public void setHostelCode(String hostelCode) {
		this.hostelCode = hostelCode;
	}

}