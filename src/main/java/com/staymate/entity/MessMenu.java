package com.staymate.entity;

import com.staymate.enums.MealType;
import jakarta.persistence.*;

@Entity
@Table(name = "mess_menu")
public class MessMenu {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "hostel_id")
    private Hostel hostel;

    private String dayOfWeek; // MONDAY..SUNDAY

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    private String dishName;
    private String timing;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Hostel getHostel() { return hostel; }
    public void setHostel(Hostel hostel) { this.hostel = hostel; }
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    public MealType getMealType() { return mealType; }
    public void setMealType(MealType mealType) { this.mealType = mealType; }
    public String getDishName() { return dishName; }
    public void setDishName(String dishName) { this.dishName = dishName; }
    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }
}