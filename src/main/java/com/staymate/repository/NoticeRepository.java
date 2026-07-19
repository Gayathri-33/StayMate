package com.staymate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {

}