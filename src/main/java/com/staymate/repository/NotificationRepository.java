package com.staymate.repository;
import com.staymate.entity.Notification;
import com.staymate.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientRoleOrderByCreatedAtDesc(Role role);
    List<Notification> findByRecipientRoleAndRecipientIdOrderByCreatedAtDesc(Role role, Long recipientId);
}