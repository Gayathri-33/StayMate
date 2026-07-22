package com.staymate.dto;

import java.util.List;

public class AdminDashboardDTO {
    private int hostelCount;
    private List<HostelSummaryDTO> hostels; // shown if hostelCount > 1
    private HostelSummaryDTO singleHostel;  // shown if hostelCount == 1
    private long totalResidents;
    private long totalRooms;
    private long occupiedBeds;
    private long availableBeds;
    private long pendingComplaints;
    private long resolvedComplaints;
    private double feesCollected;

    public AdminDashboardDTO(int hostelCount, List<HostelSummaryDTO> hostels, HostelSummaryDTO singleHostel,
                              long totalResidents, long totalRooms, long occupiedBeds, long availableBeds,
                              long pendingComplaints, long resolvedComplaints, double feesCollected) {
        this.hostelCount = hostelCount;
        this.hostels = hostels;
        this.singleHostel = singleHostel;
        this.totalResidents = totalResidents;
        this.totalRooms = totalRooms;
        this.occupiedBeds = occupiedBeds;
        this.availableBeds = availableBeds;
        this.pendingComplaints = pendingComplaints;
        this.resolvedComplaints = resolvedComplaints;
        this.feesCollected = feesCollected;
    }

    public int getHostelCount() { return hostelCount; }
    public List<HostelSummaryDTO> getHostels() { return hostels; }
    public HostelSummaryDTO getSingleHostel() { return singleHostel; }
    public long getTotalResidents() { return totalResidents; }
    public long getTotalRooms() { return totalRooms; }
    public long getOccupiedBeds() { return occupiedBeds; }
    public long getAvailableBeds() { return availableBeds; }
    public long getPendingComplaints() { return pendingComplaints; }
    public long getResolvedComplaints() { return resolvedComplaints; }
    public double getFeesCollected() { return feesCollected; }
}