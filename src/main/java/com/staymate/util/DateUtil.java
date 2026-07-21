package com.staymate.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    private static final String DEFAULT_PATTERN = "yyyy-MM-dd";

    public static String formatDate(LocalDate date) {
        if (date == null) return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DEFAULT_PATTERN);
        return date.format(formatter);
    }

    public static LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DEFAULT_PATTERN);
        return LocalDate.parse(dateStr, formatter);
    }
}