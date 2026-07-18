package com.staymate.entity;

import java.time.LocalDate;

import com.staymate.enums.AllocationStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="room_allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer allocationId;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="room_id")
    private Room room;

    private LocalDate allocatedDate;

    private LocalDate vacatedDate;

    @Enumerated(EnumType.STRING)
    private AllocationStatus allocationStatus;

	public Integer getAllocationId() {
		return allocationId;
	}

	public void setAllocationId(Integer allocationId) {
		this.allocationId = allocationId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public LocalDate getAllocatedDate() {
		return allocatedDate;
	}

	public void setAllocatedDate(LocalDate allocatedDate) {
		this.allocatedDate = allocatedDate;
	}

	public LocalDate getVacatedDate() {
		return vacatedDate;
	}

	public void setVacatedDate(LocalDate vacatedDate) {
		this.vacatedDate = vacatedDate;
	}

	public AllocationStatus getAllocationStatus() {
		return allocationStatus;
	}

	public void setAllocationStatus(AllocationStatus allocationStatus) {
		this.allocationStatus = allocationStatus;
	}

}