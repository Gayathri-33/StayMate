package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.dto.BedDTO;
import com.staymate.entity.Bed;
import com.staymate.entity.Resident;
import com.staymate.enums.Status;
import com.staymate.repository.BedRepository;
import com.staymate.repository.ResidentRepository;
import com.staymate.service.BedService;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Override
    public Bed addBed(BedDTO dto) {

        Bed bed = new Bed();

        bed.setBedNumber(dto.getBedNumber());
        bed.setRoomNumber(dto.getRoomNumber());
        bed.setHostelCode(dto.getHostelCode());

        bed.setStatus(Status.INACTIVE); // Available

        return bedRepository.save(bed);
    }

    @Override
    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    @Override
    public Bed getBedById(Long id) {
        return bedRepository.findById(id).orElse(null);
    }

    @Override
    public Bed updateBed(Long id, BedDTO dto) {

        Bed bed = bedRepository.findById(id).orElse(null);

        if (bed == null)
            return null;

        bed.setBedNumber(dto.getBedNumber());
        bed.setRoomNumber(dto.getRoomNumber());
        bed.setHostelCode(dto.getHostelCode());

        return bedRepository.save(bed);
    }

    @Override
    public void deleteBed(Long id) {
        bedRepository.deleteById(id);
    }

    @Override
    public Bed allocateBed(Long bedId, Long residentId) {

        Bed bed = bedRepository.findById(bedId).orElse(null);

        Resident resident = residentRepository.findById(residentId).orElse(null);

        if (bed == null || resident == null)
            return null;

        bed.setResidentId(residentId);

        // ACTIVE = Occupied
        bed.setStatus(Status.ACTIVE);

        return bedRepository.save(bed);
    }

    @Override
    public Bed vacateBed(Long bedId) {

        Bed bed = bedRepository.findById(bedId).orElse(null);

        if (bed == null)
            return null;

        bed.setResidentId(null);

        // INACTIVE = Available
        bed.setStatus(Status.INACTIVE);

        return bedRepository.save(bed);
    }

}