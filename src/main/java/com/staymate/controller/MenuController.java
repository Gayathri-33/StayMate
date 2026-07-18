package com.staymate.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.staymate.entity.Menu;
import com.staymate.service.MenuService;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuService service;

    @PostMapping
    public Menu saveMenu(@RequestBody Menu menu){

        return service.saveMenu(menu);

    }

    @GetMapping
    public List<Menu> getAllMenus(){

        return service.getAllMenus();

    }

    @GetMapping("/{id}")
    public Menu getMenuById(@PathVariable Integer id){

        return service.getMenuById(id);

    }

    @GetMapping("/date/{date}")
    public Menu getMenuByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date){

        return service.getMenuByDate(date);

    }

    @PutMapping("/{id}")
    public Menu updateMenu(@PathVariable Integer id,
                           @RequestBody Menu menu){

        return service.updateMenu(id, menu);

    }

    @DeleteMapping("/{id}")
    public String deleteMenu(@PathVariable Integer id){

        service.deleteMenu(id);

        return "Menu Deleted Successfully";

    }

}