package com.staymate.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Notice;
import com.staymate.repository.NoticeRepository;
import com.staymate.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public Notice saveNotice(Notice notice) {

        notice.setPostedDate(LocalDateTime.now());

        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice getNoticeById(Integer noticeId) {
        return noticeRepository.findById(noticeId).orElse(null);
    }

    @Override
    public Notice updateNotice(Integer noticeId, Notice notice) {

        Notice existingNotice =
                noticeRepository.findById(noticeId).orElse(null);

        if(existingNotice != null) {

            existingNotice.setTitle(notice.getTitle());
            existingNotice.setDescription(notice.getDescription());
            existingNotice.setExpiryDate(notice.getExpiryDate());
            existingNotice.setPostedBy(notice.getPostedBy());

            return noticeRepository.save(existingNotice);
        }

        return null;
    }

    @Override
    public void deleteNotice(Integer noticeId) {
        noticeRepository.deleteById(noticeId);
    }

}