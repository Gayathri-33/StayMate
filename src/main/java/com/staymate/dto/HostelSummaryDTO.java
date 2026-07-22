package com.staymate.dto;

public class HostelSummaryDTO {
    private Long hostelId;
    private String hostelCode;
    private String hostelName;
    private String place;
    private String hostelType;
    private Integer totalRooms;
    private String status;
    private Double feeAmount;
    private String feeCycle;
    private String adminName;
    private String adminEmail;

    public HostelSummaryDTO(Long hostelId, String hostelCode, String hostelName, String place,
                             String hostelType, Integer totalRooms, String status, Double feeAmount,
                             String feeCycle, String adminName, String adminEmail) {
        this.hostelId = hostelId;
        this.hostelCode = hostelCode;
        this.hostelName = hostelName;
        this.place = place;
        this.hostelType = hostelType;
        this.totalRooms = totalRooms;
        this.status = status;
        this.feeAmount = feeAmount;
        this.feeCycle = feeCycle;
        this.adminName = adminName;
        this.adminEmail = adminEmail;
    }

    public Long getHostelId() { return hostelId; }
    public String getHostelCode() { return hostelCode; }
    public String getHostelName() { return hostelName; }
    public String getPlace() { return place; }
    public String getHostelType() { return hostelType; }
    public Integer getTotalRooms() { return totalRooms; }
    public String getStatus() { return status; }
    public Double getFeeAmount() { return feeAmount; }
    public String getFeeCycle() { return feeCycle; }
    public String getAdminName() { return adminName; }
    public String getAdminEmail() { return adminEmail; }
}