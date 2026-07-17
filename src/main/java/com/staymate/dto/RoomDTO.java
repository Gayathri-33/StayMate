package com.staymate.dto;

import java.math.BigDecimal;

import com.staymate.enums.RoomType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDTO {

    private Integer hostelId;
    private String roomNumber;
    private Integer floorNumber;
    private RoomType roomType;
    private Integer capacity;
    private BigDecimal monthlyFee;

}