package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.ResidentDTO;
import com.staymate.entity.Resident;
import com.staymate.entity.User;
import com.staymate.enums.Role;
import com.staymate.exception.BusinessValidationException;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.ResidentRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.ResidentService;

@Service
public class ResidentServiceImpl implements ResidentService{

	@Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private UserRepository userRepository;

	@Override
	public Resident addResident(ResidentDTO residentDTO) {

		User user = userRepository.findById(residentDTO.getUserId())
		        .orElseThrow(() ->
		                new ResourceNotFoundException(
		                        "User not found with ID: " + residentDTO.getUserId()));

		if (user.getRole() != Role.RESIDENT) {
		    throw new BusinessValidationException("Only users with RESIDENT role can have a resident profile.");
		}

		if (residentRepository.existsByUser(user)) {
		    throw new BusinessValidationException("Resident profile already exists for this user.");
		}
	    Resident resident = Resident.builder()
	            .user(user)
	            .residentType(residentDTO.getResidentType())
	            .organization(residentDTO.getOrganization())
	            .course(residentDTO.getCourse())
	            .year(residentDTO.getYear())
	            .dateOfBirth(residentDTO.getDateOfBirth())
	            .gender(residentDTO.getGender())
	            .address(residentDTO.getAddress())
	            .joiningDate(residentDTO.getJoiningDate())
	            .build();

	    return residentRepository.save(resident);
	}

	@Override
	public List<Resident> getAllResidents() {
		return residentRepository.findAll();
	}

	@Override
	public Resident getResidentById(Integer residentId) {
		return residentRepository.findById(residentId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Resident not found with ID: " + residentId));
	}

	@Override
	public Resident updateResident(Integer residentId, ResidentDTO residentDTO) {

	    Resident resident = residentRepository.findById(residentId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Resident not found with ID: " + residentId));

	    resident.setOrganization(residentDTO.getOrganization());
	    resident.setCourse(residentDTO.getCourse());
	    resident.setYear(residentDTO.getYear());
	    resident.setAddress(residentDTO.getAddress());

	    return residentRepository.save(resident);
	}

	@Override
	public void deleteResident(Integer residentId) {

	    Resident resident = residentRepository.findById(residentId)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Resident not found with ID: " + residentId));

	    User user = resident.getUser();

	    residentRepository.delete(resident);
	    userRepository.delete(user);
	}

}
