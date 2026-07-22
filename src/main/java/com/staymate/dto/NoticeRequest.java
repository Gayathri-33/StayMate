package com.staymate.dto;

import java.time.LocalDate;

public class NoticeRequest {
    private String title;
    private String description;
    private LocalDate deadline;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}