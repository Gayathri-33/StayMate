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

    @Column(name = "hostel_name", nullable = false)
    private String hostelName;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "total_rooms")
    private Integer totalRooms;

    @Column(name = "total_capacity")
    private Integer totalCapacity;

    @Column(name = "warden_name")
    private String wardenName;

    @Column(name = "warden_phone")
    private String wardenPhone;

    private String email;

	public Integer getHostelId() {
		return hostelId;
	}

	public void setHostelId(Integer hostelId) {
		this.hostelId = hostelId;
	}

	public String getHostelName() {
		return hostelName;
	}

	public void setHostelName(String hostelName) {
		this.hostelName = hostelName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getTotalRooms() {
		return totalRooms;
	}

	public void setTotalRooms(Integer totalRooms) {
		this.totalRooms = totalRooms;
	}

	public Integer getTotalCapacity() {
		return totalCapacity;
	}

	public void setTotalCapacity(Integer totalCapacity) {
		this.totalCapacity = totalCapacity;
	}

	public String getWardenName() {
		return wardenName;
	}

	public void setWardenName(String wardenName) {
		this.wardenName = wardenName;
	}

	public String getWardenPhone() {
		return wardenPhone;
	}

	public void setWardenPhone(String wardenPhone) {
		this.wardenPhone = wardenPhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
}