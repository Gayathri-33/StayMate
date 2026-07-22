package com.staymate.dto;

import java.time.LocalDate;

public class ResidentDashboardDTO {
    private String fullName;
    private String residentCode;
    private String hostelName;
    private String hostelCode;
    private String roomNumber;
    private String bedNumber;
    private String status;         // PENDING_PAYMENT, ACTIVE, BLOCKED
    private String paymentStatus;  // PENDING, PAID, OVERDUE
    private LocalDate paymentDueDate;
    private Double feeAmount;
    private String feeCycle;
    private LocalDate feeExpiryDate; // for yearly plans

    public ResidentDashboardDTO(String fullName, String residentCode, String hostelName, String hostelCode,
                                 String roomNumber, String bedNumber, String status, String paymentStatus,
                                 LocalDate paymentDueDate, Double feeAmount, String feeCycle, LocalDate feeExpiryDate) {
        this.fullName = fullName;
        this.residentCode = residentCode;
        this.hostelName = hostelName;
        this.hostelCode = hostelCode;
        this.roomNumber = roomNumber;
        this.bedNumber = bedNumber;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentDueDate = paymentDueDate;
        this.feeAmount = feeAmount;
        this.feeCycle = feeCycle;
        this.feeExpiryDate = feeExpiryDate;
    }

    public String getFullName() { return fullName; }
    public String getResidentCode() { return residentCode; }
    public String getHostelName() { return hostelName; }
    public String getHostelCode() { return hostelCode; }
    public String getRoomNumber() { return roomNumber; }
    public String getBedNumber() { return bedNumber; }
    public String getStatus() { return status; }
    public String getPaymentStatus() { return paymentStatus; }
    public LocalDate getPaymentDueDate() { return paymentDueDate; }
    public Double getFeeAmount() { return feeAmount; }
    public String getFeeCycle() { return feeCycle; }
    public LocalDate getFeeExpiryDate() { return feeExpiryDate; }
}