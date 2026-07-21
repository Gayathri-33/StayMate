package com.staymate.dto;

import lombok.Data;

@Data
public class ResidentRegisterRequestDTO {

    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String hostelCode;

}