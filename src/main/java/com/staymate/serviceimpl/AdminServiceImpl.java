package com.staymate.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.enums.ComplaintStatus;
import com.staymate.enums.PaymentStatus;
import com.staymate.enums.RoomStatus;
import com.staymate.repository.ComplaintRepository;
import com.staymate.repository.FeePaymentRepository;
import com.staymate.repository.RoomRepository;
import com.staymate.repository.StudentRepository;
import com.staymate.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private FeePaymentRepository paymentRepository;

    @Override
    public long getTotalStudents() {
        return studentRepository.count();
    }

    @Override
    public long getTotalRooms() {
        return roomRepository.count();
    }

    @Override
    public long getAvailableRooms() {
        return roomRepository.countByRoomStatus(RoomStatus.AVAILABLE);
    }

    @Override
    public long getPendingComplaints() {
        return complaintRepository.countByStatus(ComplaintStatus.PENDING);
    }

    @Override
    public long getResolvedComplaints() {
        return complaintRepository.countByStatus(ComplaintStatus.RESOLVED);
    }

    @Override
    public long getPendingPayments() {
        return paymentRepository.countByPaymentStatus(PaymentStatus.PENDING);
    }

    @Override
    public Double getTotalRevenue() {
        return paymentRepository.getTotalRevenue();
    }

}