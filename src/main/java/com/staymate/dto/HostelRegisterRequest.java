package com.staymate.dto;

public class HostelRegisterRequest {
    private String hostelName;
    private String place;
    private String hostelType; // MALE, FEMALE, UNISEX
    private Integer totalRooms;
    private Double feeAmount;
    private String feeCycle; // MONTHLY, YEARLY
    private Integer paymentBufferDays;

    public String getHostelName() { return hostelName; }
    public void setHostelName(String hostelName) { this.hostelName = hostelName; }
    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }
    public String getHostelType() { return hostelType; }
    public void setHostelType(String hostelType) { this.hostelType = hostelType; }
    public Integer getTotalRooms() { return totalRooms; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }
    public Double getFeeAmount() { return feeAmount; }
    public void setFeeAmount(Double feeAmount) { this.feeAmount = feeAmount; }
    public String getFeeCycle() { return feeCycle; }
    public void setFeeCycle(String feeCycle) { this.feeCycle = feeCycle; }
    public Integer getPaymentBufferDays() { return paymentBufferDays; }
    public void setPaymentBufferDays(Integer paymentBufferDays) { this.paymentBufferDays = paymentBufferDays; }
}