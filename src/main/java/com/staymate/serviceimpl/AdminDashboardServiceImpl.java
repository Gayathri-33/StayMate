package com.staymate.serviceimpl;

import org.springframework.stereotype.Service;

import com.staymate.dto.AdminDashboardDTO;
import com.staymate.service.AdminDashboardService;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    @Override
    public AdminDashboardDTO getDashboard() {

        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalResidents(0);
        dto.setTotalRooms(0);
        dto.setOccupiedRooms(0);
        dto.setAvailableRooms(0);
        dto.setPendingRequests(0);
        dto.setPendingComplaints(0);
        dto.setFeeCollected(0);

        return dto;
    }

}