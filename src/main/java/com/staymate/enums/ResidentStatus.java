package com.staymate.enums;

public enum ResidentStatus {
    PENDING,           // NEW - waiting for admin approval
    PENDING_PAYMENT,   // Approved by admin, waiting for payment
    ACTIVE,            // Paid and active
    BLOCKED,           // Overdue payment
    REJECTED           // Admin rejected the application
}