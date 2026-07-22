package com.staymate.serviceimpl;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.HostelRegistrationDTO;
import com.staymate.entity.Hostel;
import com.staymate.enums.Status;
import com.staymate.repository.HostelRepository;
import com.staymate.service.HostelService;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Hostel registerHostel(HostelRegistrationDTO dto) {

        Hostel hostel = new Hostel();

        hostel.setHostelName(dto.getHostelName());
        hostel.setOwnerName(dto.getOwnerName());
        hostel.setEmail(dto.getEmail());
        hostel.setPhone(dto.getPhone());
        hostel.setAddress(dto.getAddress());
        hostel.setCity(dto.getCity());
        hostel.setState(dto.getState());
        hostel.setPincode(dto.getPincode());
        hostel.setTotalRooms(dto.getTotalRooms());
        hostel.setTotalBeds(dto.getTotalBeds());
        hostel.setIdProof(dto.getIdProof());
        hostel.setHostelLicense(dto.getHostelLicense());

        hostel.setStatus(Status.INACTIVE);

        return hostelRepository.save(hostel);
    }

    @Override
    public List<Hostel> getPendingHostels() {

        return hostelRepository.findByStatus(Status.INACTIVE);

    }

    @Override
    public Hostel approveHostel(Long hostelId) {

        Hostel hostel = hostelRepository.findById(hostelId).orElse(null);

        if (hostel != null) {

            hostel.setStatus(Status.ACTIVE);

            hostel.setHostelCode(generateHostelCode(hostel.getHostelName()));

            return hostelRepository.save(hostel);
        }

        return null;
    }

    @Override
    public Hostel rejectHostel(Long hostelId) {

        Hostel hostel = hostelRepository.findById(hostelId).orElse(null);

        if (hostel != null) {

            hostelRepository.delete(hostel);
        }

        return hostel;
    }

    private String generateHostelCode(String hostelName) {

        String prefix = hostelName
                .replaceAll("\\s+", "")
                .toUpperCase();

        if (prefix.length() >= 4) {
            prefix = prefix.substring(0, 4);
        } else {
            while (prefix.length() < 4) {
                prefix += "X";
            }
        }

        Random random = new Random();

        int number = 1000 + random.nextInt(9000);

        return prefix + "FMU" + number;
    }
    @Override
    public List<Hostel> getApprovedHostels() {

        return hostelRepository.findByStatus(Status.ACTIVE);

    }
}