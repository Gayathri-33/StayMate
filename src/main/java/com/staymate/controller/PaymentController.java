package com.staymate.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.staymate.entity.Payment;
import com.staymate.entity.Resident;
import com.staymate.entity.User;
import com.staymate.enums.PaymentStatus;
import com.staymate.enums.ResidentStatus;
import com.staymate.repository.PaymentRepository;
import com.staymate.repository.ResidentRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/resident/payments")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;
    private final ResidentRepository residentRepository;

    public PaymentController(PaymentRepository paymentRepository, ResidentRepository residentRepository) {
        this.paymentRepository = paymentRepository;
        this.residentRepository = residentRepository;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(Authentication auth) {
        try {
            User user = (User) auth.getPrincipal();
            Resident resident = residentRepository.findByUser_UserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Resident profile not found"));

            if (resident.getPaymentStatus() == PaymentStatus.PAID) {
                return ResponseEntity.badRequest().body(Map.of("error", "Payment already completed"));
            }

            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", resident.getHostel().getFeeAmount() * 100);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt_" + resident.getResidentCode());
            
            Order order = client.orders.create(orderRequest);

            Payment payment = new Payment();
            payment.setResident(resident);
            payment.setAmount(resident.getHostel().getFeeAmount());
            payment.setRazorpayOrderId(order.get("id"));
            payment.setStatus(PaymentStatus.PENDING);
            payment.setCyclePeriod(resident.getHostel().getFeeCycle());
            paymentRepository.save(payment);

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", resident.getHostel().getFeeAmount());
            response.put("razorpayKeyId", razorpayKeyId);
            response.put("hostelName", resident.getHostel().getHostelName());
            response.put("qrImagePath", resident.getHostel().getQrImagePath());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Payment error: " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(Authentication auth, @RequestBody Map<String, String> paymentData) {
        try {
            User user = (User) auth.getPrincipal();
            Resident resident = residentRepository.findByUser_UserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Resident profile not found"));

            String razorpayOrderId = paymentData.get("razorpayOrderId");
            String razorpayPaymentId = paymentData.get("razorpayPaymentId");
            String razorpaySignature = paymentData.get("razorpaySignature");

            String payload = razorpayOrderId + "|" + razorpayPaymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(payload.getBytes());
            String expectedSignature = Base64.getEncoder().encodeToString(hash);

            if (!expectedSignature.equals(razorpaySignature)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid payment signature"));
            }

            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Payment record not found"));
            
            payment.setStatus(PaymentStatus.PAID);
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setPaidOn(LocalDateTime.now());
            paymentRepository.save(payment);

            resident.setPaymentStatus(PaymentStatus.PAID);
            resident.setStatus(ResidentStatus.ACTIVE);
            residentRepository.save(resident);

            return ResponseEntity.ok(Map.of("message", "Payment verified successfully"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Payment verification failed: " + e.getMessage()));
        }
    }
}