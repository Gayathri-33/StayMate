package com.staymate.dto;

public class DashboardStatsDTO {
    private long totalAdmins;
    private long pendingAdmins;
    private long totalHostels;
    private long pendingHostels;
    private long totalResidents;
    private long unreadNotifications;

    public DashboardStatsDTO(long totalAdmins, long pendingAdmins, long totalHostels,
                              long pendingHostels, long totalResidents, long unreadNotifications) {
        this.totalAdmins = totalAdmins;
        this.pendingAdmins = pendingAdmins;
        this.totalHostels = totalHostels;
        this.pendingHostels = pendingHostels;
        this.totalResidents = totalResidents;
        this.unreadNotifications = unreadNotifications;
    }

    public long getTotalAdmins() { return totalAdmins; }
    public long getPendingAdmins() { return pendingAdmins; }
    public long getTotalHostels() { return totalHostels; }
    public long getPendingHostels() { return pendingHostels; }
    public long getTotalResidents() { return totalResidents; }
    public long getUnreadNotifications() { return unreadNotifications; }
}