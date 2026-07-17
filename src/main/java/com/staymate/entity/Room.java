package com.staymate.entity;

import java.math.BigDecimal;

import com.staymate.enums.RoomStatus;
import com.staymate.enums.RoomType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "rooms",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"hostel_id", "room_number"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Integer roomId;

    @ManyToOne
    @JoinColumn(name = "hostel_id", nullable = false)
    private Hostel hostel;

    @Column(name = "room_number", nullable = false, length = 20)
    private String roomNumber;

    @Column(name = "floor_number", nullable = false)
    private Integer floorNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private RoomType roomType;

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "occupied_count", nullable = false)
    @Builder.Default
    private Integer occupiedCount = 0;

    @Column(name = "monthly_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal monthlyFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_status", nullable = false)
    @Builder.Default
    private RoomStatus roomStatus = RoomStatus.AVAILABLE;
}