package com.staymate.service;

import java.util.List;

import com.staymate.entity.FeePayment;
import com.staymate.enums.PaymentStatus;

public interface FeePaymentService {

    FeePayment savePayment(FeePayment payment);

    List<FeePayment> getAllPayments();

    FeePayment getPaymentById(Integer paymentId);

    FeePayment updatePayment(Integer paymentId, FeePayment payment);

    void deletePayment(Integer paymentId);

    List<FeePayment> getPaymentsByStatus(PaymentStatus status);

    List<FeePayment> getPaymentsByMonth(String month, Integer year);

    FeePayment getPaymentByReceipt(String receiptNumber);

}