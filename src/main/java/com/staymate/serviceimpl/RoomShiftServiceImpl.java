package com.staymate.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.RoomShiftRequest;
import com.staymate.enums.RequestStatus;
import com.staymate.repository.RoomShiftRepository;
import com.staymate.service.RoomShiftService;

@Service
public class RoomShiftServiceImpl implements RoomShiftService{

    @Autowired
    private RoomShiftRepository repository;

    @Override
    public RoomShiftRequest saveRequest(RoomShiftRequest request) {

        request.setRequestDate(LocalDate.now());

        if(request.getStatus()==null){

            request.setStatus(RequestStatus.PENDING);

        }

        return repository.save(request);

    }

    @Override
    public List<RoomShiftRequest> getAllRequests() {

        return repository.findAll();

    }

    @Override
    public RoomShiftRequest getRequestById(Integer id) {

        return repository.findById(id).orElse(null);

    }

    @Override
    public RoomShiftRequest updateRequest(Integer id, RoomShiftRequest request) {

        RoomShiftRequest existing=repository.findById(id).orElse(null);

        if(existing!=null){

            existing.setCurrentRoom(request.getCurrentRoom());
            existing.setRequestedRoom(request.getRequestedRoom());
            existing.setReason(request.getReason());
            existing.setStatus(request.getStatus());
            existing.setAdminRemarks(request.getAdminRemarks());

            return repository.save(existing);

        }

        return null;
    }

    @Override
    public void deleteRequest(Integer id) {

        repository.deleteById(id);

    }

    @Override
    public List<RoomShiftRequest> getRequestsByStatus(RequestStatus status) {

        return repository.findByStatus(status);

    }

}