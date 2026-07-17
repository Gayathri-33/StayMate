package com.staymate.entity;

import java.time.LocalDate;

import com.staymate.enums.AllocationStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "room_allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allocation_id")
    private Integer allocationId;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "allocated_date", nullable = false)
    private LocalDate allocatedDate;

    @Column(name = "vacated_date")
    private LocalDate vacatedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "allocation_status", nullable = false)
    @Builder.Default
    private AllocationStatus allocationStatus = AllocationStatus.ACTIVE;

    @PrePersist
    public void onCreate() {
        if (allocatedDate == null) {
            allocatedDate = LocalDate.now();
        }
    }
}