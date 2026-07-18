package com.staymate.dto;

import java.time.LocalDate;

import com.staymate.enums.Gender;
import com.staymate.enums.ResidentType;

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
public class ResidentDTO {

    private Integer userId;

    private ResidentType residentType;

    private String organization;

    private String course;

    private Integer year;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String address;

    private LocalDate joiningDate;

}