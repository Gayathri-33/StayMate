package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Rating;
import com.staymate.service.RatingService;

@RestController
@RequestMapping("/ratings")
@CrossOrigin(origins="*")
public class RatingController {

    @Autowired
    private RatingService service;

    @PostMapping
    public Rating saveRating(@RequestBody Rating rating){

        return service.saveRating(rating);

    }

    @GetMapping
    public List<Rating> getAllRatings(){

        return service.getAllRatings();

    }

    @GetMapping("/{id}")
    public Rating getRating(@PathVariable Integer id){

        return service.getRatingById(id);

    }

    @PutMapping("/{id}")
    public Rating updateRating(@PathVariable Integer id,
                               @RequestBody Rating rating){

        return service.updateRating(id,rating);

    }

    @DeleteMapping("/{id}")
    public String deleteRating(@PathVariable Integer id){

        service.deleteRating(id);

        return "Rating Deleted Successfully";

    }

}