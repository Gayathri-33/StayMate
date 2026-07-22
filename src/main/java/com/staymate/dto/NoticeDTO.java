package com.staymate.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NoticeDTO {
    private Long noticeId;
    private String title;
    private String description;
    private LocalDate deadline;
    private LocalDateTime createdAt;

    public NoticeDTO(Long noticeId, String title, String description, LocalDate deadline, LocalDateTime createdAt) {
        this.noticeId = noticeId;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.createdAt = createdAt;
    }

    public Long getNoticeId() { return noticeId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDate getDeadline() { return deadline; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}