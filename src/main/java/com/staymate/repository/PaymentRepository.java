package com.staymate.repository;

import com.staymate.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByResident_ResidentId(Long residentId);
    Optional<Payment> findByRazorpayOrderId(String orderId);
}