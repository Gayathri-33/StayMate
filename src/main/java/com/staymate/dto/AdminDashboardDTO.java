package com.staymate.dto;

public class AdminDashboardDTO {

    private long totalResidents;
    private long totalRooms;
    private long occupiedRooms;
    private long availableRooms;
    private long pendingRequests;
    private long pendingComplaints;
    private double feeCollected;
	public long getTotalResidents() {
		return totalResidents;
	}
	public void setTotalResidents(long totalResidents) {
		this.totalResidents = totalResidents;
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
	public long getPendingRequests() {
		return pendingRequests;
	}
	public void setPendingRequests(long pendingRequests) {
		this.pendingRequests = pendingRequests;
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