package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.DashboardDTO;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.repository.HostelRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public DashboardDTO getDashboardData() {

        DashboardDTO dto = new DashboardDTO();

        // Total Admins
        long adminCount = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .count();

        dto.setTotalAdmins(adminCount);

        // Total Hostels
        dto.setTotalHostels(hostelRepository.count());

        // These modules will be implemented later
        dto.setTotalRooms(0);
        dto.setOccupiedRooms(0);
        dto.setAvailableRooms(0);
        dto.setPendingComplaints(0);
        dto.setFeeCollected(0);

        return dto;
    }
}