package com.staymate.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.staymate.dto.*;
import com.staymate.entity.*;
import com.staymate.enums.*;
import com.staymate.repository.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final ResidentRepository residentRepository;
    private final PaymentRepository paymentRepository;
    private final NotificationRepository notificationRepository;

    public PaymentService(ResidentRepository residentRepository, PaymentRepository paymentRepository,
                           NotificationRepository notificationRepository) {
        this.residentRepository = residentRepository;
        this.paymentRepository = paymentRepository;
        this.notificationRepository = notificationRepository;
    }

    // ---------- CREATE ORDER ----------

    public CreateOrderResponse createOrder(Long userId) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Hostel hostel = resident.getHostel();
        Double amount = hostel.getFeeAmount();

        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int) (amount * 100)); // paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "RCPT-" + resident.getResidentCode() + "-" + System.currentTimeMillis());

            Order order = client.orders.create(orderRequest);
            String orderId = order.get("id");

            // record a PENDING payment row tied to this order
            Payment payment = new Payment();
            payment.setResident(resident);
            payment.setAmount(amount);
            payment.setRazorpayOrderId(orderId);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setCyclePeriod(currentCyclePeriod(hostel.getFeeCycle()));
            paymentRepository.save(payment);

            return new CreateOrderResponse(orderId, razorpayKeyId, amount, "INR",
                    hostel.getHostelName(), hostel.getQrImagePath());

        } catch (Exception e) {
            throw new RuntimeException("Unable to create payment order: " + e.getMessage());
        }
    }

    private String currentCyclePeriod(FeeCycle cycle) {
        return cycle == FeeCycle.YEARLY
                ? String.valueOf(LocalDate.now().getYear())
                : YearMonth.now().toString(); // e.g. "2026-07"
    }

    // ---------- VERIFY PAYMENT ----------

    public void verifyPayment(Long userId, VerifyPaymentRequest req) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        Payment payment = paymentRepository.findByRazorpayOrderId(req.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!payment.getResident().getResidentId().equals(resident.getResidentId())) {
            throw new RuntimeException("Order does not belong to this resident");
        }

        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", req.getRazorpayOrderId());
            options.put("razorpay_payment_id", req.getRazorpayPaymentId());
            options.put("razorpay_signature", req.getRazorpaySignature());

            boolean valid = Utils.verifyPaymentSignature(options, razorpayKeySecret);

            if (!valid) {
                throw new RuntimeException("Payment signature verification failed");
            }
        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }

        payment.setRazorpayPaymentId(req.getRazorpayPaymentId());
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaidOn(java.time.LocalDateTime.now());
        paymentRepository.save(payment);

        resident.setPaymentStatus(PaymentStatus.PAID);
        if (resident.getStatus() == ResidentStatus.PENDING_PAYMENT) {
            resident.setStatus(ResidentStatus.ACTIVE);
        }
        residentRepository.save(resident);

        // notify admin of successful payment
        if (resident.getHostel().getAdmin() != null) {
            Notification notif = new Notification();
            notif.setRecipientRole(Role.ADMIN);
            notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
            notif.setMessage(resident.getUser().getFullName() + " completed payment of ₹" +
                    payment.getAmount() + " for " + payment.getCyclePeriod());
            notificationRepository.save(notif);
        }
    }

    // ---------- HISTORY ----------

    public List<PaymentHistoryDTO> getHistory(Long userId) {
        Resident resident = residentRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident record not found"));

        return paymentRepository.findByResident_ResidentId(resident.getResidentId()).stream()
                .map(p -> new PaymentHistoryDTO(p.getPaymentId(), p.getAmount(), p.getStatus().name(),
                        p.getCyclePeriod(), p.getPaidOn()))
                .toList();
    }
}