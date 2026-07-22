package com.staymate.service;

import java.util.List;

import com.staymate.dto.ResidentRegistrationDTO;
import com.staymate.entity.Resident;

public interface ResidentService {

    Resident registerResident(ResidentRegistrationDTO dto);

    List<Resident> getPendingResidents();

    List<Resident> getApprovedResidents();

    Resident approveResident(Long residentId);

    Resident rejectResident(Long residentId);

    Resident getResidentById(Long residentId);

    Resident updateResident(Long residentId, ResidentRegistrationDTO dto);

    void deleteResident(Long residentId);

}