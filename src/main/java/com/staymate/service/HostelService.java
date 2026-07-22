package com.staymate.service;

import java.util.List;

import com.staymate.dto.HostelRegistrationDTO;
import com.staymate.entity.Hostel;

public interface HostelService {

    Hostel registerHostel(HostelRegistrationDTO dto);

    List<Hostel> getPendingHostels();

    Hostel approveHostel(Long hostelId);

    Hostel rejectHostel(Long hostelId);
    
    List<Hostel> getApprovedHostels();

}