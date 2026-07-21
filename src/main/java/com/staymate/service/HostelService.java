package com.staymate.service;

import java.util.List;

import com.staymate.dto.HostelAddDTO;
import com.staymate.dto.HostelResponseDTO;

public interface HostelService {

    String addHostel(HostelAddDTO hostelAddDTO);

    List<HostelResponseDTO> getAllHostels();

    HostelResponseDTO getHostelById(Long hostelId);

    String updateHostel(Long hostelId, HostelAddDTO hostelAddDTO);

    String deleteHostel(Long hostelId);

}