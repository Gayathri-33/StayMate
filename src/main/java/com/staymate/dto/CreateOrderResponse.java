package com.staymate.dto;

public class CreateOrderResponse {
    private String orderId;
    private String razorpayKeyId;
    private Double amount; // in rupees
    private String currency;
    private String hostelName;
    private String qrImagePath;

    public CreateOrderResponse(String orderId, String razorpayKeyId, Double amount,
                                String currency, String hostelName, String qrImagePath) {
        this.orderId = orderId;
        this.razorpayKeyId = razorpayKeyId;
        this.amount = amount;
        this.currency = currency;
        this.hostelName = hostelName;
        this.qrImagePath = qrImagePath;
    }

    public String getOrderId() { return orderId; }
    public String getRazorpayKeyId() { return razorpayKeyId; }
    public Double getAmount() { return amount; }
    public String getCurrency() { return currency; }
    public String getHostelName() { return hostelName; }
    public String getQrImagePath() { return qrImagePath; }
}