package com.staymate.serviceimpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Notice;
import com.staymate.repository.NoticeRepository;
import com.staymate.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepository repository;

    @Override
    public Notice saveNotice(Notice notice) {

        notice.setPostedDate(LocalDateTime.now());

        return repository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {

        return repository.findAll();

    }

    @Override
    public List<Notice> getActiveNotices() {

        return repository.findByExpiryDateGreaterThanEqual(LocalDate.now());

    }

    @Override
    public Notice getNoticeById(Integer id) {

        return repository.findById(id).orElse(null);

    }

    @Override
    public Notice updateNotice(Integer id, Notice notice) {

        Notice existing=repository.findById(id).orElse(null);

        if(existing!=null){

            existing.setTitle(notice.getTitle());
            existing.setDescription(notice.getDescription());
            existing.setExpiryDate(notice.getExpiryDate());
            existing.setPostedBy(notice.getPostedBy());

            return repository.save(existing);

        }

        return null;
    }

    @Override
    public void deleteNotice(Integer id) {

        repository.deleteById(id);

    }

}