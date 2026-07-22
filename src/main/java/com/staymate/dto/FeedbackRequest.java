package com.staymate.dto;

public class FeedbackRequest {
    private Integer rating;
    private String comments;
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}