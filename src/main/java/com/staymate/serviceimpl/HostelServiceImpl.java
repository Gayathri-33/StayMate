package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.HostelDTO;
import com.staymate.entity.Hostel;
import com.staymate.exception.ResourceNotFoundException;
import com.staymate.repository.HostelRepository;
import com.staymate.service.HostelService;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Hostel addHostel(HostelDTO hostelDTO) {

        Hostel hostel = new Hostel();

        hostel.setHostelName(hostelDTO.getHostelName());
        hostel.setAddress(hostelDTO.getAddress());
        hostel.setOwnerName(hostelDTO.getOwnerName());
        hostel.setOwnerPhone(hostelDTO.getOwnerPhone());
        hostel.setOwnerEmail(hostelDTO.getOwnerEmail());
        hostel.setTotalRooms(hostelDTO.getTotalRooms());
        hostel.setTotalCapacity(hostelDTO.getTotalCapacity());

        return hostelRepository.save(hostel);
    }

    @Override
    public List<Hostel> getAllHostels() {

        return hostelRepository.findAll();
    }
    
    @Override
    public Hostel getHostelById(Integer hostelId) {

        return hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hostel not found with ID: " + hostelId));
    }

    @Override
    public Hostel updateHostel(Integer hostelId, HostelDTO hostelDTO) {

        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hostel not found with ID: " + hostelId));

        hostel.setHostelName(hostelDTO.getHostelName());
        hostel.setAddress(hostelDTO.getAddress());
        hostel.setOwnerName(hostelDTO.getOwnerName());
        hostel.setOwnerPhone(hostelDTO.getOwnerPhone());
        hostel.setOwnerEmail(hostelDTO.getOwnerEmail());

        return hostelRepository.save(hostel);
    }

    @Override
    public void deleteHostel(Integer hostelId) {
    	Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hostel not found with ID: " + hostelId));

        hostelRepository.delete(hostel);
    }

}