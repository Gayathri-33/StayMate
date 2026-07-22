package com.staymate.dto;

public class HostelSearchDTO {
    private Long hostelId;
    private String hostelCode;
    private String hostelName;
    private String place;
    private String hostelType;
    private Double feeAmount;
    private String feeCycle;
    private Integer totalRooms;

    public HostelSearchDTO(Long hostelId, String hostelCode, String hostelName, String place,
                            String hostelType, Double feeAmount, String feeCycle, Integer totalRooms) {
        this.hostelId = hostelId;
        this.hostelCode = hostelCode;
        this.hostelName = hostelName;
        this.place = place;
        this.hostelType = hostelType;
        this.feeAmount = feeAmount;
        this.feeCycle = feeCycle;
        this.totalRooms = totalRooms;
    }

    public Long getHostelId() { return hostelId; }
    public String getHostelCode() { return hostelCode; }
    public String getHostelName() { return hostelName; }
    public String getPlace() { return place; }
    public String getHostelType() { return hostelType; }
    public Double getFeeAmount() { return feeAmount; }
    public String getFeeCycle() { return feeCycle; }
    public Integer getTotalRooms() { return totalRooms; }
}