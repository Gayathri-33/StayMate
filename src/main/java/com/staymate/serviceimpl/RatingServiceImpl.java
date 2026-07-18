package com.staymate.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Rating;
import com.staymate.repository.RatingRepository;
import com.staymate.service.RatingService;

@Service
public class RatingServiceImpl implements RatingService{

    @Autowired
    private RatingRepository repository;

    @Override
    public Rating saveRating(Rating rating) {

        rating.setRatingDate(LocalDate.now());

        int overall =
                (rating.getFoodRating()
                + rating.getCleanlinessRating()
                + rating.getWifiRating()
                + rating.getSecurityRating()) / 4;

        rating.setOverallRating(overall);

        return repository.save(rating);

    }

    @Override
    public List<Rating> getAllRatings() {

        return repository.findAll();

    }

    @Override
    public Rating getRatingById(Integer id) {

        return repository.findById(id).orElse(null);

    }

    @Override
    public Rating updateRating(Integer id, Rating rating) {

        Rating existing = repository.findById(id).orElse(null);

        if(existing != null){

            existing.setFoodRating(rating.getFoodRating());
            existing.setCleanlinessRating(rating.getCleanlinessRating());
            existing.setWifiRating(rating.getWifiRating());
            existing.setSecurityRating(rating.getSecurityRating());
            existing.setReview(rating.getReview());

            int overall =
                    (rating.getFoodRating()
                    + rating.getCleanlinessRating()
                    + rating.getWifiRating()
                    + rating.getSecurityRating()) / 4;

            existing.setOverallRating(overall);

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteRating(Integer id) {

        repository.deleteById(id);

    }

}