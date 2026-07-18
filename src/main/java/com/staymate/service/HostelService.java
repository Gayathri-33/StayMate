package com.staymate.service;

import java.util.List;
import com.staymate.entity.Hostel;

public interface HostelService {

    Hostel saveHostel(Hostel hostel);

    List<Hostel> getAllHostels();

    Hostel getHostelById(Integer id);

    Hostel updateHostel(Integer id, Hostel hostel);

    void deleteHostel(Integer id);
}