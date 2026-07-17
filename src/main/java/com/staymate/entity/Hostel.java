package com.staymate.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hostel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hostel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hostel_id")
    private Integer hostelId;

    @Column(name = "hostel_name", nullable = false, length = 100)
    private String hostelName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "owner_phone", nullable = false, unique = true, length = 15)
    private String ownerPhone;

    @Column(name = "owner_email", nullable = false, unique = true, length = 100)
    private String ownerEmail;

    @Column(name = "total_rooms", nullable = false)
    private Integer totalRooms;

    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;
    
}