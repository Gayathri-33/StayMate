package com.staymate.dto;

public class LoginResponseDTO {

    private String token;
    private String fullName;
    private String email;
    private String role;
    private String hostelCode;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token,
                            String fullName,
                            String email,
                            String role,
                            String hostelCode) {

        this.token = token;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.hostelCode = hostelCode;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getHostelCode() {
        return hostelCode;
    }

    public void setHostelCode(String hostelCode) {
        this.hostelCode = hostelCode;
    }

}