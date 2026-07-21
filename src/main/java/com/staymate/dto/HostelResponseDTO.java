package com.staymate.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HostelResponseDTO {

    private Long hostelId;

    private String hostelName;

    private String hostelCode;

    private String hostelAddress;

    private String contactEmail;

    private String contactPhone;

    private Integer totalRooms;

}