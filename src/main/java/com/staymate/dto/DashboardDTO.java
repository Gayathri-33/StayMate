package com.staymate.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardDTO {

    private Long totalStudents;

    private Long totalRooms;

    private Long availableRooms;

    private Long occupiedRooms;

    private Double totalRevenue;

    private Long pendingPayments;

    private Long pendingComplaints;

    private Long resolvedComplaints;

    private Long totalNotices;

	public Long getTotalStudents() {
		return totalStudents;
	}

	public void setTotalStudents(Long totalStudents) {
		this.totalStudents = totalStudents;
	}

	public Long getTotalRooms() {
		return totalRooms;
	}

	public void setTotalRooms(Long totalRooms) {
		this.totalRooms = totalRooms;
	}

	public Long getAvailableRooms() {
		return availableRooms;
	}

	public void setAvailableRooms(Long availableRooms) {
		this.availableRooms = availableRooms;
	}

	public Long getOccupiedRooms() {
		return occupiedRooms;
	}

	public void setOccupiedRooms(Long occupiedRooms) {
		this.occupiedRooms = occupiedRooms;
	}

	public Double getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Long getPendingPayments() {
		return pendingPayments;
	}

	public void setPendingPayments(Long pendingPayments) {
		this.pendingPayments = pendingPayments;
	}

	public Long getPendingComplaints() {
		return pendingComplaints;
	}

	public void setPendingComplaints(Long pendingComplaints) {
		this.pendingComplaints = pendingComplaints;
	}

	public Long getResolvedComplaints() {
		return resolvedComplaints;
	}

	public void setResolvedComplaints(Long resolvedComplaints) {
		this.resolvedComplaints = resolvedComplaints;
	}

	public Long getTotalNotices() {
		return totalNotices;
	}

	public void setTotalNotices(Long totalNotices) {
		this.totalNotices = totalNotices;
	}
    
}