package com.staymate.service;

import java.util.List;

import com.staymate.dto.ResidentDTO;
import com.staymate.entity.Resident;

public interface ResidentService {

    Resident addResident(ResidentDTO residentDTO);

    List<Resident> getAllResidents();

    Resident getResidentById(Integer residentId);

    Resident updateResident(Integer residentId, ResidentDTO residentDTO);

    void deleteResident(Integer residentId);

}