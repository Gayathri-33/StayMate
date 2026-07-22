package com.staymate.dto;

public class LoginResponse {
    private String token;
    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private String adminStatus; // null for non-admins
    private String hostelCode;  // null if not linked yet

    public LoginResponse(String token, Long userId, String fullName, String email,
                          String role, String adminStatus, String hostelCode) {
        this.token = token;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.adminStatus = adminStatus;
        this.hostelCode = hostelCode;
    }

    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getAdminStatus() { return adminStatus; }
    public String getHostelCode() { return hostelCode; }
}