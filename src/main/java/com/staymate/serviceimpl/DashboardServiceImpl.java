package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.DashboardDTO;
import com.staymate.enums.ComplaintStatus;
import com.staymate.enums.PaymentStatus;
import com.staymate.enums.RoomStatus;
import com.staymate.repository.*;
import com.staymate.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private FeePaymentRepository feeRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public DashboardDTO getDashboard() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalStudents(studentRepository.count());

        dto.setTotalRooms(roomRepository.count());

        dto.setAvailableRooms(
                roomRepository.countByRoomStatus(RoomStatus.AVAILABLE));

        dto.setOccupiedRooms(
                roomRepository.countByRoomStatus(RoomStatus.FULL));

        dto.setTotalRevenue(
                feeRepository.getTotalRevenue());

        dto.setPendingPayments(
                feeRepository.countByPaymentStatus(
                        PaymentStatus.PENDING));

        dto.setPendingComplaints(
                complaintRepository.countByStatus(
                        ComplaintStatus.PENDING));

        dto.setResolvedComplaints(
                complaintRepository.countByStatus(
                        ComplaintStatus.RESOLVED));

        dto.setTotalNotices(
                noticeRepository.count());

        return dto;
    }

}