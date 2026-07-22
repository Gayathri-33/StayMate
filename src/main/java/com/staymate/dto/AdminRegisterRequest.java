package com.staymate.dto;

public class AdminRegisterRequest {
    private String fullName;
    private String email;
    private String phone;
    private String aadharNo;
    private String panNo;
    private String hostelAddress;
    private String password;
    private String confirmPassword;
    private Integer roomCount;

    // getters/setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAadharNo() { return aadharNo; }
    public void setAadharNo(String aadharNo) { this.aadharNo = aadharNo; }
    public String getPanNo() { return panNo; }
    public void setPanNo(String panNo) { this.panNo = panNo; }
    public String getHostelAddress() { return hostelAddress; }
    public void setHostelAddress(String hostelAddress) { this.hostelAddress = hostelAddress; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    public Integer getRoomCount() { return roomCount; }
    public void setRoomCount(Integer roomCount) { this.roomCount = roomCount; }
}