package com.staymate.entity;

import java.time.LocalDate;

import com.staymate.enums.Gender;
import com.staymate.enums.ResidentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "residents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    private Integer residentId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "resident_type", nullable = false)
    private ResidentType residentType;

    @Column(length = 100)
    private String organization;

    @Column(length = 100)
    private String course;
    
    @Column
    private Integer year;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

}