package com.staymate.entity;

import com.staymate.enums.FeeCycle;
import com.staymate.enums.PaymentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "resident_id")
    private Resident resident;

    private Double amount;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String cyclePeriod; // e.g. "2026-07" or "2026" for yearly

    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;

    private LocalDateTime paidOn;

	private FeeCycle feeCycle;
    
    
    // getters/setters
    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }
    public Resident getResident() { return resident; }
    public void setResident(Resident resident) { this.resident = resident; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }
    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }
    public String getCyclePeriod() { return cyclePeriod; }
    public void setCyclePeriod(String cyclePeriod) { this.cyclePeriod = cyclePeriod; }
    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }
    public LocalDateTime getPaidOn() { return paidOn; }
    public void setPaidOn(LocalDateTime paidOn) { this.paidOn = paidOn; }
	public void setCyclePeriod(FeeCycle feeCycle) {
		// TODO Auto-generated method stub
		this.feeCycle = feeCycle;
	}
	public FeeCycle getFeeCycle() {
		return feeCycle;
	}
	public void setFeeCycle(FeeCycle feeCycle) {
		this.feeCycle = feeCycle;
	}
}