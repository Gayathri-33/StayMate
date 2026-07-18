package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Hostel;
import com.staymate.repository.HostelRepository;
import com.staymate.service.HostelService;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Hostel saveHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    @Override
    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    @Override
    public Hostel getHostelById(Integer hostelId) {
        return hostelRepository.findById(hostelId).orElse(null);
    }

    @Override
    public Hostel updateHostel(Integer hostelId, Hostel hostel) {

        Hostel existing = hostelRepository.findById(hostelId).orElse(null);

        if(existing != null){

            existing.setHostelName(hostel.getHostelName());
            existing.setAddress(hostel.getAddress());
            existing.setTotalRooms(hostel.getTotalRooms());
            existing.setTotalCapacity(hostel.getTotalCapacity());
            existing.setWardenName(hostel.getWardenName());
            existing.setWardenPhone(hostel.getWardenPhone());
            existing.setEmail(hostel.getEmail());

            return hostelRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteHostel(Integer hostelId) {

        hostelRepository.deleteById(hostelId);

    }

}