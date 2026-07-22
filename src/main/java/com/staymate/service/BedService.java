package com.staymate.service;

import java.util.List;

import com.staymate.dto.BedDTO;
import com.staymate.entity.Bed;

public interface BedService {

    Bed addBed(BedDTO dto);

    List<Bed> getAllBeds();

    Bed getBedById(Long id);

    Bed updateBed(Long id, BedDTO dto);

    void deleteBed(Long id);

    Bed allocateBed(Long bedId, Long residentId);

    Bed vacateBed(Long bedId);

}