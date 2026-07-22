package com.staymate.entity;

import com.staymate.enums.FeeCycle;
import com.staymate.enums.HostelStatus;
import com.staymate.enums.HostelType;
import jakarta.persistence.*;

@Entity
@Table(name = "hostels")
public class Hostel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostelId;

    @Column(unique = true)
    private String hostelCode;

    private String hostelName;
    private String place;

    @Enumerated(EnumType.STRING)
    private HostelType hostelType;

    private Integer totalRooms;

    @Enumerated(EnumType.STRING)
    private HostelStatus status;

    private Double feeAmount;

    @Enumerated(EnumType.STRING)
    private FeeCycle feeCycle;

    private Integer paymentBufferDays;
    private String qrImagePath;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    // getters/setters
    public Long getHostelId() { return hostelId; }
    public void setHostelId(Long hostelId) { this.hostelId = hostelId; }
    public String getHostelCode() { return hostelCode; }
    public void setHostelCode(String hostelCode) { this.hostelCode = hostelCode; }
    public String getHostelName() { return hostelName; }
    public void setHostelName(String hostelName) { this.hostelName = hostelName; }
    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }
    public HostelType getHostelType() { return hostelType; }
    public void setHostelType(HostelType hostelType) { this.hostelType = hostelType; }
    public Integer getTotalRooms() { return totalRooms; }
    public void setTotalRooms(Integer totalRooms) { this.totalRooms = totalRooms; }
    public HostelStatus getStatus() { return status; }
    public void setStatus(HostelStatus status) { this.status = status; }
    public Double getFeeAmount() { return feeAmount; }
    public void setFeeAmount(Double feeAmount) { this.feeAmount = feeAmount; }
    public FeeCycle getFeeCycle() { return feeCycle; }
    public void setFeeCycle(FeeCycle feeCycle) { this.feeCycle = feeCycle; }
    public Integer getPaymentBufferDays() { return paymentBufferDays; }
    public void setPaymentBufferDays(Integer paymentBufferDays) { this.paymentBufferDays = paymentBufferDays; }
    public String getQrImagePath() { return qrImagePath; }
    public void setQrImagePath(String qrImagePath) { this.qrImagePath = qrImagePath; }
    public User getAdmin() { return admin; }
    public void setAdmin(User admin) { this.admin = admin; }
}