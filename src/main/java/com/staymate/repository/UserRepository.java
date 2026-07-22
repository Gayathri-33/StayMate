package com.staymate.repository;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.enums.AdminStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findByRoleAndAdminStatus(Role role, AdminStatus status);
    boolean existsByEmail(String email);
}