package com.staymate.service;

import java.util.List;

import com.staymate.entity.Notice;

public interface NoticeService {

    Notice saveNotice(Notice notice);

    List<Notice> getAllNotices();

    List<Notice> getActiveNotices();

    Notice getNoticeById(Integer id);

    Notice updateNotice(Integer id, Notice notice);

    void deleteNotice(Integer id);

}