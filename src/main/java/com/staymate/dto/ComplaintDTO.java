package com.staymate.dto;

import java.time.LocalDateTime;

public class ComplaintDTO {
    private Long complaintId;
    private String title;
    private String description;
    private String status;
    private String residentName;
    private String residentCode;
    private String roomNumber;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    public ComplaintDTO(Long complaintId, String title, String description, String status,
                         String residentName, String residentCode, String roomNumber,
                         LocalDateTime createdAt, LocalDateTime resolvedAt) {
        this.complaintId = complaintId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.residentName = residentName;
        this.residentCode = residentCode;
        this.roomNumber = roomNumber;
        this.createdAt = createdAt;
        this.resolvedAt = resolvedAt;
    }

    public Long getComplaintId() { return complaintId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public String getResidentName() { return residentName; }
    public String getResidentCode() { return residentCode; }
    public String getRoomNumber() { return roomNumber; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
}