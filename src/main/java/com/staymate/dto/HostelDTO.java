package com.staymate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HostelDTO {

    private String hostelName;

    private String address;

    private String ownerName;

    private String ownerPhone;

    private String ownerEmail;

    private Integer totalRooms;

    private Integer totalCapacity;

}