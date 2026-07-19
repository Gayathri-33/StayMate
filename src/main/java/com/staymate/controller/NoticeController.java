package com.staymate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Notice;
import com.staymate.service.NoticeService;

@RestController
@RequestMapping("/notices")
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping
    public Notice saveNotice(@RequestBody Notice notice) {
        return noticeService.saveNotice(notice);
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public Notice getNoticeById(@PathVariable Integer id) {
        return noticeService.getNoticeById(id);
    }

    @PutMapping("/{id}")
    public Notice updateNotice(@PathVariable Integer id,
                               @RequestBody Notice notice) {

        return noticeService.updateNotice(id, notice);
    }

    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable Integer id) {

        noticeService.deleteNotice(id);

        return "Notice deleted successfully";
    }

}