package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.FeePayment;
import com.staymate.enums.PaymentStatus;
import com.staymate.service.FeePaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class FeePaymentController {

    @Autowired
    private FeePaymentService feePaymentService;

    // Save Payment
    @PostMapping
    public FeePayment savePayment(@RequestBody FeePayment payment) {
        return feePaymentService.savePayment(payment);
    }

    // Get All Payments
    @GetMapping
    public List<FeePayment> getAllPayments() {
        return feePaymentService.getAllPayments();
    }

    // Get Payment By ID
    @GetMapping("/{id}")
    public FeePayment getPaymentById(@PathVariable Integer id) {
        return feePaymentService.getPaymentById(id);
    }

    // Update Payment
    @PutMapping("/{id}")
    public FeePayment updatePayment(@PathVariable Integer id,
                                    @RequestBody FeePayment payment) {
        return feePaymentService.updatePayment(id, payment);
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Integer id) {

        feePaymentService.deletePayment(id);

        return "Payment Deleted Successfully";
    }

    // Get Payments By Status
    @GetMapping("/status/{status}")
    public List<FeePayment> getPaymentsByStatus(
            @PathVariable PaymentStatus status) {

        return feePaymentService.getPaymentsByStatus(status);
    }

    // Get Payments By Month & Year
    @GetMapping("/month/{month}/{year}")
    public List<FeePayment> getPaymentsByMonth(
            @PathVariable String month,
            @PathVariable Integer year) {

        return feePaymentService.getPaymentsByMonth(month, year);
    }

    // Get Payment By Receipt Number
    @GetMapping("/receipt/{receiptNumber}")
    public FeePayment getPaymentByReceipt(
            @PathVariable String receiptNumber) {

        return feePaymentService.getPaymentByReceipt(receiptNumber);
    }

}