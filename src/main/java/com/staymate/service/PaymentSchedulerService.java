package com.staymate.service;

import com.staymate.entity.Notification;
import com.staymate.entity.Resident;
import com.staymate.enums.PaymentStatus;
import com.staymate.enums.ResidentStatus;
import com.staymate.enums.Role;
import com.staymate.repository.NotificationRepository;
import com.staymate.repository.ResidentRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentSchedulerService {

    private final ResidentRepository residentRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public PaymentSchedulerService(ResidentRepository residentRepository,
                                    NotificationRepository notificationRepository,
                                    EmailService emailService) {
        this.residentRepository = residentRepository;
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    // Runs once a day at 1 AM
    @Scheduled(cron = "0 0 1 * * *")
    public void blockOverdueResidents() {
        // Only block residents who were APPROVED but haven't paid
        List<Resident> overdue = residentRepository
            .findByStatusAndPaymentDueDateBefore(ResidentStatus.PENDING_PAYMENT, LocalDate.now());

        for (Resident resident : overdue) {
            resident.setStatus(ResidentStatus.BLOCKED);
            resident.setPaymentStatus(PaymentStatus.OVERDUE);
            residentRepository.save(resident);

            // notify the resident
            emailService.send(resident.getUser().getEmail(), "StayMate - Account Blocked",
                    "Hi " + resident.getUser().getFullName() + ",\n\nYour account has been blocked because " +
                    "payment was not completed by the due date (" + resident.getPaymentDueDate() +
                    "). Please contact your hostel admin to resolve this.\n\n- StayMate Team");

            // notify the admin
            if (resident.getHostel().getAdmin() != null) {
                Notification notif = new Notification();
                notif.setRecipientRole(Role.ADMIN);
                notif.setRecipientId(resident.getHostel().getAdmin().getUserId());
                notif.setMessage(resident.getUser().getFullName() + " (Room/Bed pending lookup) was blocked " +
                        "for missing the payment deadline of " + resident.getPaymentDueDate());
                notificationRepository.save(notif);

                emailService.send(resident.getHostel().getAdmin().getEmail(), "StayMate - Resident Blocked",
                        resident.getUser().getFullName() + " (" + resident.getResidentCode() +
                        ") has been auto-blocked for non-payment past " + resident.getPaymentDueDate() +
                        ". Their bed remains reserved until you decide to vacate or extend their deadline.");
            }
        }
    }
}