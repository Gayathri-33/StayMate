package com.staymate.dto;

public class AdminSummaryDTO {
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String aadharNo;
    private String panNo;
    private String hostelAddress;
    private Integer proposedRoomCount;
    private String status;

    public AdminSummaryDTO(Long userId, String fullName, String email, String phone,
                            String aadharNo, String panNo, String hostelAddress,
                            Integer proposedRoomCount, String status) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.aadharNo = aadharNo;
        this.panNo = panNo;
        this.hostelAddress = hostelAddress;
        this.proposedRoomCount = proposedRoomCount;
        this.status = status;
    }

    public Long getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAadharNo() { return aadharNo; }
    public String getPanNo() { return panNo; }
    public String getHostelAddress() { return hostelAddress; }
    public Integer getProposedRoomCount() { return proposedRoomCount; }
    public String getStatus() { return status; }
}