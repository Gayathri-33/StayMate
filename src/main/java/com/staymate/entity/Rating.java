package com.staymate.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private Integer foodRating;

    private Integer cleanlinessRating;

    private Integer wifiRating;

    private Integer securityRating;

    private Integer overallRating;

    @Column(columnDefinition = "TEXT")
    private String review;

    private LocalDate ratingDate;

	public Integer getRatingId() {
		return ratingId;
	}

	public void setRatingId(Integer ratingId) {
		this.ratingId = ratingId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Integer getFoodRating() {
		return foodRating;
	}

	public void setFoodRating(Integer foodRating) {
		this.foodRating = foodRating;
	}

	public Integer getCleanlinessRating() {
		return cleanlinessRating;
	}

	public void setCleanlinessRating(Integer cleanlinessRating) {
		this.cleanlinessRating = cleanlinessRating;
	}

	public Integer getWifiRating() {
		return wifiRating;
	}

	public void setWifiRating(Integer wifiRating) {
		this.wifiRating = wifiRating;
	}

	public Integer getSecurityRating() {
		return securityRating;
	}

	public void setSecurityRating(Integer securityRating) {
		this.securityRating = securityRating;
	}

	public Integer getOverallRating() {
		return overallRating;
	}

	public void setOverallRating(Integer overallRating) {
		this.overallRating = overallRating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public LocalDate getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(LocalDate ratingDate) {
		this.ratingDate = ratingDate;
	}
    
    
}