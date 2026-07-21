package com.staymate.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HostelAddDTO {

    @NotBlank(message = "Hostel name is required")
    private String hostelName;

    @NotBlank(message = "Hostel address is required")
    private String hostelAddress;

    @Email(message = "Invalid email")
    @NotBlank(message = "Contact email is required")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    @NotNull(message = "Total rooms is required")
    private Integer totalRooms;

}