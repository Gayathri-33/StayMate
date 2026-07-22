package com.staymate.dto;

public class MessMenuRequest {
    private String dayOfWeek;
    private String mealType;
    private String dishName;
    private String timing;

    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public String getDishName() { return dishName; }
    public void setDishName(String dishName) { this.dishName = dishName; }
    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }
}