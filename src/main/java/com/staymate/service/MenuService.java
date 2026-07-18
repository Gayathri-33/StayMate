package com.staymate.service;

import java.time.LocalDate;
import java.util.List;

import com.staymate.entity.Menu;

public interface MenuService {

    Menu saveMenu(Menu menu);

    List<Menu> getAllMenus();

    Menu getMenuById(Integer id);

    Menu getMenuByDate(LocalDate date);

    Menu updateMenu(Integer id, Menu menu);

    void deleteMenu(Integer id);

}