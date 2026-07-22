package com.staymate.dto;

public class MessMenuDTO {
    private Long id;
    private String dayOfWeek;
    private String mealType;
    private String dishName;
    private String timing;

    public MessMenuDTO(Long id, String dayOfWeek, String mealType, String dishName, String timing) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.mealType = mealType;
        this.dishName = dishName;
        this.timing = timing;
    }

    public Long getId() { return id; }
    public String getDayOfWeek() { return dayOfWeek; }
    public String getMealType() { return mealType; }
    public String getDishName() { return dishName; }
    public String getTiming() { return timing; }
}