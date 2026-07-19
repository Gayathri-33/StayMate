package com.staymate.service;

public interface AdminService {

    long getTotalStudents();

    long getTotalRooms();

    long getAvailableRooms();

    long getPendingComplaints();

    long getResolvedComplaints();

    long getPendingPayments();

    Double getTotalRevenue();

}