package com.staymate.service;

import java.util.List;

import com.staymate.entity.Notice;

public interface NoticeService {

    Notice saveNotice(Notice notice);

    List<Notice> getAllNotices();

    Notice getNoticeById(Integer noticeId);

    Notice updateNotice(Integer noticeId, Notice notice);

    void deleteNotice(Integer noticeId);

}