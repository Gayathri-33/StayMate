package com.staymate.dto;

public class RoomShiftCreateRequest {
    private Long newRoomId;
    private String reasonLeaving;
    private String reasonWanted;

    public Long getNewRoomId() { return newRoomId; }
    public void setNewRoomId(Long newRoomId) { this.newRoomId = newRoomId; }
    public String getReasonLeaving() { return reasonLeaving; }
    public void setReasonLeaving(String reasonLeaving) { this.reasonLeaving = reasonLeaving; }
    public String getReasonWanted() { return reasonWanted; }
    public void setReasonWanted(String reasonWanted) { this.reasonWanted = reasonWanted; }
}