package com.staymate.config;

import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByRole(Role.SUPER_ADMIN).isEmpty()) {
            User su = new User();
            su.setFullName("Super Admin");
            su.setEmail("superadmin@staymate.com");
            su.setPhone("9999999999");
            su.setPassword(passwordEncoder.encode("Admin@123"));
            su.setRole(Role.SUPER_ADMIN);
            userRepository.save(su);
            System.out.println("Seeded Super Admin: superadmin@staymate.com / Admin@123");
        }
    }
}