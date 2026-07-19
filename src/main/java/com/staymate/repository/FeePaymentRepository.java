package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.FeePayment;
import com.staymate.entity.Student;
import org.springframework.data.jpa.repository.Query;
import com.staymate.enums.PaymentStatus;

@Repository
public interface FeePaymentRepository extends JpaRepository<FeePayment, Integer> {

    // Get all payments of a student
    List<FeePayment> findByStudent(Student student);

    // Get payments by status
    List<FeePayment> findByPaymentStatus(PaymentStatus paymentStatus);

    // Get payments by month and year
    List<FeePayment> findByMonthAndYear(String month, Integer year);

    // Find payment using receipt number
    FeePayment findByReceiptNumber(String receiptNumber);
    
    long countByPaymentStatus(PaymentStatus paymentStatus);

    @Query("""
    SELECT COALESCE(SUM(f.amount),0)
    FROM FeePayment f
    WHERE f.paymentStatus='PAID'
    """)
    Double getTotalRevenue();
}