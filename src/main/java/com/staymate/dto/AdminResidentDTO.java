package com.staymate.dto;

import java.time.LocalDate;

public class AdminResidentDTO {
    private Long residentId;
    private String residentCode;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String roomNumber;
    private String bedNumber;
    private String status;
    private String paymentStatus;
    private LocalDate registrationDate;
    private LocalDate paymentDueDate;

    public AdminResidentDTO(Long residentId, String residentCode, String fullName, String email, String phone,
                             String address, String roomNumber, String bedNumber, String status,
                             String paymentStatus, LocalDate registrationDate, LocalDate paymentDueDate) {
        this.residentId = residentId;
        this.residentCode = residentCode;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.roomNumber = roomNumber;
        this.bedNumber = bedNumber;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.registrationDate = registrationDate;
        this.paymentDueDate = paymentDueDate;
    }

    public Long getResidentId() { return residentId; }
    public String getResidentCode() { return residentCode; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public String getRoomNumber() { return roomNumber; }
    public String getBedNumber() { return bedNumber; }
    public String getStatus() { return status; }
    public String getPaymentStatus() { return paymentStatus; }
    public LocalDate getRegistrationDate() { return registrationDate; }
    public LocalDate getPaymentDueDate() { return paymentDueDate; }
}