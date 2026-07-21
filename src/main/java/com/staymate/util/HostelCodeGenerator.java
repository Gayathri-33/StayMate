package com.staymate.util;

public class HostelCodeGenerator {

    public static String generate(String hostelName, long sequenceNumber) {

        String prefix = hostelName.replaceAll("\\s+", "")
                                  .toUpperCase();

        if (prefix.length() >= 4) {
            prefix = prefix.substring(0, 4);
        } else {
            prefix = String.format("%-4s", prefix).replace(' ', 'X');
        }

        return prefix + String.format("%04d", sequenceNumber);
    }
}