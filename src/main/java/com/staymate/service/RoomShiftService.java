package com.staymate.service;

import java.util.List;

import com.staymate.entity.RoomShiftRequest;
import com.staymate.enums.RequestStatus;

public interface RoomShiftService {

    RoomShiftRequest saveRequest(RoomShiftRequest request);

    List<RoomShiftRequest> getAllRequests();

    RoomShiftRequest getRequestById(Integer id);

    RoomShiftRequest updateRequest(Integer id, RoomShiftRequest request);

    void deleteRequest(Integer id);

    List<RoomShiftRequest> getRequestsByStatus(RequestStatus status);

}