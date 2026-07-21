package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.HostelAddDTO;
import com.staymate.dto.HostelResponseDTO;
import com.staymate.repository.HostelRepository;
import com.staymate.repository.UserRepository;
import com.staymate.service.HostelService;
import com.staymate.util.HostelCodeGenerator;
import com.staymate.entity.Hostel;
import com.staymate.entity.User;

@Service
public class HostelServiceImpl implements HostelService {

	@Autowired
	private HostelRepository hostelRepository;

	@Autowired
	private UserRepository userRepository;
    
	@Override
	public String addHostel(HostelAddDTO dto) {
		
		// TODO:
		// Temporary implementation:
		// Currently fetching admin using userId = 1.
		// After Spring Security + JWT is implemented,
		// retrieve the logged-in admin from SecurityContextHolder
		// and fetch the User using the authenticated email.
		
//		Authentication authentication =
//		        SecurityContextHolder.getContext().getAuthentication();
//
//		String email = authentication.getName();
//
//		User admin = userRepository.findByEmail(email)
//		        .orElseThrow(() -> new RuntimeException("Admin not found"));

	    // Temporary: Replace with logged-in admin after JWT
	    User admin = userRepository.findById(1L)
	            .orElseThrow(() -> new RuntimeException("Admin not found"));

	    long nextSequence = hostelRepository.count() + 1;

	    String hostelCode = HostelCodeGenerator.generate(
	            dto.getHostelName(),
	            nextSequence
	    );

	    Hostel hostel = Hostel.builder()
	            .hostelName(dto.getHostelName())
	            .hostelCode(hostelCode)
	            .hostelAddress(dto.getHostelAddress())
	            .contactEmail(dto.getContactEmail())
	            .contactPhone(dto.getContactPhone())
	            .totalRooms(dto.getTotalRooms())
	            .admin(admin)
	            .build();

	    hostelRepository.save(hostel);

	    return "Hostel added successfully.";
	}    
    
	@Override
	public List<HostelResponseDTO> getAllHostels() {

	    List<Hostel> hostels = hostelRepository.findAll();

	    return hostels.stream()
	            .map(hostel -> HostelResponseDTO.builder()
	                    .hostelId(hostel.getHostelId())
	                    .hostelName(hostel.getHostelName())
	                    .hostelCode(hostel.getHostelCode())
	                    .hostelAddress(hostel.getHostelAddress())
	                    .contactEmail(hostel.getContactEmail())
	                    .contactPhone(hostel.getContactPhone())
	                    .totalRooms(hostel.getTotalRooms())
	                    .build())
	            .toList();
	}

	@Override
	public HostelResponseDTO getHostelById(Long hostelId) {

	    Hostel hostel = hostelRepository.findById(hostelId)
	            .orElseThrow(() -> new RuntimeException("Hostel not found"));

	    return HostelResponseDTO.builder()
	            .hostelId(hostel.getHostelId())
	            .hostelName(hostel.getHostelName())
	            .hostelCode(hostel.getHostelCode())
	            .hostelAddress(hostel.getHostelAddress())
	            .contactEmail(hostel.getContactEmail())
	            .contactPhone(hostel.getContactPhone())
	            .totalRooms(hostel.getTotalRooms())
	            .build();
	}

	@Override
	public String updateHostel(Long hostelId, HostelAddDTO hostelAddDTO) {

	    Hostel hostel = hostelRepository.findById(hostelId)
	            .orElseThrow(() -> new RuntimeException("Hostel not found"));

	    hostel.setHostelName(hostelAddDTO.getHostelName());
	    hostel.setHostelAddress(hostelAddDTO.getHostelAddress());
	    hostel.setContactEmail(hostelAddDTO.getContactEmail());
	    hostel.setContactPhone(hostelAddDTO.getContactPhone());
	    hostel.setTotalRooms(hostelAddDTO.getTotalRooms());

	    hostelRepository.save(hostel);

	    return "Hostel updated successfully.";
	}

	@Override
	public String deleteHostel(Long hostelId) {
		// TODO Auto-generated method stub
		return null;
	}
}