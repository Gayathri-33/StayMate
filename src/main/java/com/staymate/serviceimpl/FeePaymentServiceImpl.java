package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.FeePayment;
import com.staymate.repository.FeePaymentRepository;
import com.staymate.service.FeePaymentService;
import com.staymate.enums.PaymentStatus;

@Service
public class FeePaymentServiceImpl implements FeePaymentService {

    @Autowired
    private FeePaymentRepository paymentRepository;

    @Override
    public FeePayment savePayment(FeePayment payment) {

        return paymentRepository.save(payment);

    }

    @Override
    public List<FeePayment> getAllPayments() {

        return paymentRepository.findAll();

    }

    @Override
    public FeePayment getPaymentById(Integer paymentId) {

        return paymentRepository.findById(paymentId).orElse(null);

    }

    @Override
    public FeePayment updatePayment(Integer paymentId, FeePayment payment) {

        FeePayment existingPayment =
                paymentRepository.findById(paymentId).orElse(null);

        if(existingPayment != null){

            existingPayment.setStudent(payment.getStudent());
            existingPayment.setAmount(payment.getAmount());
            existingPayment.setPaymentDate(payment.getPaymentDate());
            existingPayment.setPaymentMethod(payment.getPaymentMethod());
            existingPayment.setTransactionId(payment.getTransactionId());
            existingPayment.setMonth(payment.getMonth());
            existingPayment.setYear(payment.getYear());
            existingPayment.setPaymentStatus(payment.getPaymentStatus());
            existingPayment.setReceiptNumber(payment.getReceiptNumber());

            return paymentRepository.save(existingPayment);

        }

        return null;

    }

    @Override
    public void deletePayment(Integer paymentId) {

        paymentRepository.deleteById(paymentId);

    }

    @Override
    public List<FeePayment> getPaymentsByStatus(PaymentStatus status) {

        return paymentRepository.findByPaymentStatus(status);

    }

    @Override
    public List<FeePayment> getPaymentsByMonth(String month, Integer year) {

        return paymentRepository.findByMonthAndYear(month, year);

    }

    @Override
    public FeePayment getPaymentByReceipt(String receiptNumber) {

        return paymentRepository.findByReceiptNumber(receiptNumber);

    }

}