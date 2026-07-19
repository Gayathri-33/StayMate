package com.staymate.service;

import java.util.List;

import com.staymate.entity.Student;

public interface StudentService {

    Student saveStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Integer studentId);

    Student updateStudent(Integer studentId, Student student);

    void deleteStudent(Integer studentId);
    
//    StudentResponseDTO createProfile(Long userId, StudentRequestDTO dto);
//
//    StudentResponseDTO getProfile(Long userId);
//
//    StudentResponseDTO updateProfile(Long userId, StudentRequestDTO dto);
}