package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.ResidentRegistrationDTO;
import com.staymate.entity.Resident;
import com.staymate.enums.Status;
import com.staymate.repository.ResidentRepository;
import com.staymate.service.ResidentService;

@Service
public class ResidentServiceImpl implements ResidentService {

    @Autowired
    private ResidentRepository residentRepository;

    @Override
    public Resident registerResident(ResidentRegistrationDTO dto) {

        Resident resident = new Resident();

        resident.setFullName(dto.getFullName());
        resident.setGender(dto.getGender());
        resident.setDateOfBirth(dto.getDateOfBirth());
        resident.setPhone(dto.getPhone());
        resident.setEmail(dto.getEmail());
        resident.setPassword(dto.getPassword());
        resident.setAadhaarNumber(dto.getAadhaarNumber());
        resident.setParentName(dto.getParentName());
        resident.setParentPhone(dto.getParentPhone());
        resident.setAddress(dto.getAddress());
        resident.setCollegeOrCompany(dto.getCollegeOrCompany());
        resident.setEmergencyContact(dto.getEmergencyContact());
        resident.setHostelCode(dto.getHostelCode());

        resident.setStatus(Status.INACTIVE);

        return residentRepository.save(resident);
    }

    @Override
    public List<Resident> getPendingResidents() {
        return residentRepository.findByStatus(Status.INACTIVE);
    }

    @Override
    public List<Resident> getApprovedResidents() {
        return residentRepository.findByStatus(Status.ACTIVE);
    }

    @Override
    public Resident approveResident(Long residentId) {

        Resident resident = residentRepository.findById(residentId).orElse(null);

        if (resident != null) {

            resident.setStatus(Status.ACTIVE);

            resident.setResidentCode(generateResidentCode(residentId));

            return residentRepository.save(resident);
        }

        return null;
    }

    @Override
    public Resident rejectResident(Long residentId) {

        Resident resident = residentRepository.findById(residentId).orElse(null);

        if (resident != null) {
            residentRepository.delete(resident);
        }

        return resident;
    }

    private String generateResidentCode(Long id) {
        return String.format("RES%04d", id);
    }
    
    @Override
    public Resident getResidentById(Long residentId) {

        return residentRepository.findById(residentId).orElse(null);

    }

    @Override
    public Resident updateResident(Long residentId, ResidentRegistrationDTO dto) {

        Resident resident = residentRepository.findById(residentId).orElse(null);

        if (resident == null) {
            return null;
        }

        resident.setFullName(dto.getFullName());
        resident.setGender(dto.getGender());
        resident.setDateOfBirth(dto.getDateOfBirth());
        resident.setPhone(dto.getPhone());
        resident.setEmail(dto.getEmail());
        resident.setAadhaarNumber(dto.getAadhaarNumber());
        resident.setParentName(dto.getParentName());
        resident.setParentPhone(dto.getParentPhone());
        resident.setAddress(dto.getAddress());
        resident.setCollegeOrCompany(dto.getCollegeOrCompany());
        resident.setEmergencyContact(dto.getEmergencyContact());

        return residentRepository.save(resident);
    }

    @Override
    public void deleteResident(Long residentId) {

        residentRepository.deleteById(residentId);

    }
}