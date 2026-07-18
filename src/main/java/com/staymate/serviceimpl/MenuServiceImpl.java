package com.staymate.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Menu;
import com.staymate.repository.MenuRepository;
import com.staymate.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService{

    @Autowired
    private MenuRepository repository;

    @Override
    public Menu saveMenu(Menu menu) {

        return repository.save(menu);

    }

    @Override
    public List<Menu> getAllMenus() {

        return repository.findAll();

    }

    @Override
    public Menu getMenuById(Integer id) {

        return repository.findById(id).orElse(null);

    }

    @Override
    public Menu getMenuByDate(LocalDate date) {

        return repository.findByMenuDate(date).orElse(null);

    }

    @Override
    public Menu updateMenu(Integer id, Menu menu) {

        Menu existing = repository.findById(id).orElse(null);

        if(existing != null){

            existing.setMenuDate(menu.getMenuDate());
            existing.setBreakfast(menu.getBreakfast());
            existing.setLunch(menu.getLunch());
            existing.setSnacks(menu.getSnacks());
            existing.setDinner(menu.getDinner());
            existing.setUpdatedBy(menu.getUpdatedBy());

            return repository.save(existing);

        }

        return null;

    }

    @Override
    public void deleteMenu(Integer id) {

        repository.deleteById(id);

    }

}