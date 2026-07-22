package com.staymate.dto;

public class DashboardDTO {

    private long totalAdmins;
    private long totalHostels;
    private long totalRooms;
    private long occupiedRooms;
    private long availableRooms;
    private long pendingComplaints;
    private double feeCollected;

    public DashboardDTO() {
    }

	public long getTotalAdmins() {
		return totalAdmins;
	}

	public void setTotalAdmins(long totalAdmins) {
		this.totalAdmins = totalAdmins;
	}

	public long getTotalHostels() {
		return totalHostels;
	}

	public void setTotalHostels(long totalHostels) {
		this.totalHostels = totalHostels;
	}

	public long getTotalRooms() {
		return totalRooms;
	}

	public void setTotalRooms(long totalRooms) {
		this.totalRooms = totalRooms;
	}

	public long getOccupiedRooms() {
		return occupiedRooms;
	}

	public void setOccupiedRooms(long occupiedRooms) {
		this.occupiedRooms = occupiedRooms;
	}

	public long getAvailableRooms() {
		return availableRooms;
	}

	public void setAvailableRooms(long availableRooms) {
		this.availableRooms = availableRooms;
	}

	public long getPendingComplaints() {
		return pendingComplaints;
	}

	public void setPendingComplaints(long pendingComplaints) {
		this.pendingComplaints = pendingComplaints;
	}

	public double getFeeCollected() {
		return feeCollected;
	}

	public void setFeeCollected(double feeCollected) {
		this.feeCollected = feeCollected;
	}

    

}