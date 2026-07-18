package com.staymate.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice,Integer>{

    List<Notice> findByExpiryDateGreaterThanEqual(LocalDate date);

}