package com.staymate.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_profiles")
public class AdminProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String aadharNo;
    private String panNo;
    private String hostelAddress;
    private Integer proposedRoomCount;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getAadharNo() { return aadharNo; }
    public void setAadharNo(String aadharNo) { this.aadharNo = aadharNo; }
    public String getPanNo() { return panNo; }
    public void setPanNo(String panNo) { this.panNo = panNo; }
    public String getHostelAddress() { return hostelAddress; }
    public void setHostelAddress(String hostelAddress) { this.hostelAddress = hostelAddress; }
    public Integer getProposedRoomCount() { return proposedRoomCount; }
    public void setProposedRoomCount(Integer proposedRoomCount) { this.proposedRoomCount = proposedRoomCount; }
}