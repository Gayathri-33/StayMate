package com.staymate.dto;

import java.time.LocalDateTime;

public class PaymentHistoryDTO {
    private Long paymentId;
    private Double amount;
    private String status;
    private String cyclePeriod;
    private LocalDateTime paidOn;

    public PaymentHistoryDTO(Long paymentId, Double amount, String status, String cyclePeriod, LocalDateTime paidOn) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
        this.cyclePeriod = cyclePeriod;
        this.paidOn = paidOn;
    }

    public Long getPaymentId() { return paymentId; }
    public Double getAmount() { return amount; }
    public String getStatus() { return status; }
    public String getCyclePeriod() { return cyclePeriod; }
    public LocalDateTime getPaidOn() { return paidOn; }
}