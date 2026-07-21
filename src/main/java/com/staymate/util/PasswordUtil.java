package com.staymate.util;

public class PasswordUtil {

    // Simple helper method to validate or handle raw passwords
    public static boolean isValidPassword(String password) {
        return password != null && password.length() >= 6;
    }
}