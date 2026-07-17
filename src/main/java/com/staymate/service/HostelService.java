package com.staymate.service;

import java.util.List;

import com.staymate.dto.HostelDTO;
import com.staymate.entity.Hostel;

public interface HostelService {

    Hostel addHostel(HostelDTO hostelDTO);

    List<Hostel> getAllHostels();
    
    Hostel getHostelById(Integer hostelId);

    Hostel updateHostel(Integer hostelId, HostelDTO hostelDTO);

    void deleteHostel(Integer hostelId);

}