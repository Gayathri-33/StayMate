package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.dto.BedDTO;
import com.staymate.entity.Bed;
import com.staymate.service.BedService;

@RestController
@RequestMapping("/beds")
@CrossOrigin(origins = "http://localhost:5173")
public class BedController {

    @Autowired
    private BedService bedService;

    @PostMapping
    public Bed addBed(@RequestBody BedDTO dto) {
        return bedService.addBed(dto);
    }

    @GetMapping
    public List<Bed> getAllBeds() {
        return bedService.getAllBeds();
    }

    @GetMapping("/{id}")
    public Bed getBed(@PathVariable Long id) {
        return bedService.getBedById(id);
    }

    @PutMapping("/{id}")
    public Bed updateBed(@PathVariable Long id,
                         @RequestBody BedDTO dto) {

        return bedService.updateBed(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteBed(@PathVariable Long id) {
        bedService.deleteBed(id);
    }

    @PutMapping("/allocate/{bedId}/{residentId}")
    public Bed allocateBed(@PathVariable Long bedId,
                           @PathVariable Long residentId) {

        return bedService.allocateBed(bedId, residentId);
    }

    @PutMapping("/vacate/{bedId}")
    public Bed vacateBed(@PathVariable Long bedId) {

        return bedService.vacateBed(bedId);
    }

}