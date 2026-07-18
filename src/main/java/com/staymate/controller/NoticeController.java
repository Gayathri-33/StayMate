package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Notice;
import com.staymate.service.NoticeService;

@RestController
@RequestMapping("/notices")
@CrossOrigin(origins="*")
public class NoticeController {

    @Autowired
    private NoticeService service;

    @PostMapping
    public Notice saveNotice(@RequestBody Notice notice){

        return service.saveNotice(notice);

    }

    @GetMapping
    public List<Notice> getAllNotices(){

        return service.getAllNotices();

    }

    @GetMapping("/active")
    public List<Notice> getActiveNotices(){

        return service.getActiveNotices();

    }

    @GetMapping("/{id}")
    public Notice getNotice(@PathVariable Integer id){

        return service.getNoticeById(id);

    }

    @PutMapping("/{id}")
    public Notice updateNotice(@PathVariable Integer id,
                               @RequestBody Notice notice){

        return service.updateNotice(id,notice);

    }

    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable Integer id){

        service.deleteNotice(id);

        return "Notice Deleted Successfully";

    }

}