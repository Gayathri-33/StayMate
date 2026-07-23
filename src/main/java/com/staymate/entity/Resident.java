package com.staymate.entity;

import com.staymate.enums.PaymentStatus;
import com.staymate.enums.ResidentStatus;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "residents")
public class Resident {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long residentId;

    @Column(unique = true)
    private String residentCode;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;

    private LocalDate registrationDate;
    private LocalDate paymentDueDate;

    @Enumerated(EnumType.STRING)
    private ResidentStatus status = ResidentStatus.PENDING_PAYMENT;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    // ADD THIS FIELD
    @ManyToOne
    @JoinColumn(name="bed_id")
    private Bed bed;
    // getters/setters
    public Long getResidentId() { return residentId; }
    public void setResidentId(Long residentId) { this.residentId = residentId; }
    public String getResidentCode() { return residentCode; }
    public void setResidentCode(String residentCode) { this.residentCode = residentCode; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Hostel getHostel() { return hostel; }
    public void setHostel(Hostel hostel) { this.hostel = hostel; }
    public LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDate registrationDate) { this.registrationDate = registrationDate; }
    public LocalDate getPaymentDueDate() { return paymentDueDate; }
    public void setPaymentDueDate(LocalDate paymentDueDate) { this.paymentDueDate = paymentDueDate; }
    public ResidentStatus getStatus() { return status; }
    public void setStatus(ResidentStatus status) { this.status = status; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
	public Bed getBed() {
		return bed;
	}
	public void setBed(Bed bed) {
		this.bed = bed;
	}
    
}