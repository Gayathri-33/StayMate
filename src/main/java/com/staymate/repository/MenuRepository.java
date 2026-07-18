package com.staymate.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.staymate.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer>{

    Optional<Menu> findByMenuDate(LocalDate menuDate);

}