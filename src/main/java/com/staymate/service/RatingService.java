package com.staymate.service;

import java.util.List;

import com.staymate.entity.Rating;

public interface RatingService {

    Rating saveRating(Rating rating);

    List<Rating> getAllRatings();

    Rating getRatingById(Integer id);

    Rating updateRating(Integer id, Rating rating);

    void deleteRating(Integer id);

}