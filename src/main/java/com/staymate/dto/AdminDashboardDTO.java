package com.staymate.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDTO {

    private long totalStudents;

    private long totalRooms;

    private long availableRooms;

    private long pendingComplaints;

    private long resolvedComplaints;

    private long pendingPayments;

    private Double totalRevenue;

	public long getTotalStudents() {
		return totalStudents;
	}

	public void setTotalStudents(long totalStudents) {
		this.totalStudents = totalStudents;
	}

	public long getTotalRooms() {
		return totalRooms;
	}

	public void setTotalRooms(long totalRooms) {
		this.totalRooms = totalRooms;
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

	public long getResolvedComplaints() {
		return resolvedComplaints;
	}

	public void setResolvedComplaints(long resolvedComplaints) {
		this.resolvedComplaints = resolvedComplaints;
	}

	public long getPendingPayments() {
		return pendingPayments;
	}

	public void setPendingPayments(long pendingPayments) {
		this.pendingPayments = pendingPayments;
	}

	public Double getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}
    
    
}