package com.staymate.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staymate.entity.Student;
import com.staymate.repository.StudentRepository;
import com.staymate.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Integer studentId) {
        return studentRepository.findById(studentId).orElse(null);
    }

    @Override
    public Student updateStudent(Integer studentId, Student student) {

        Student existingStudent = studentRepository.findById(studentId).orElse(null);

        if (existingStudent != null) {

            existingStudent.setRollNumber(student.getRollNumber());
            existingStudent.setCollegeName(student.getCollegeName());
            existingStudent.setDepartment(student.getDepartment());
            existingStudent.setYear(student.getYear());
            existingStudent.setGender(student.getGender());
            existingStudent.setParentName(student.getParentName());
            existingStudent.setParentPhone(student.getParentPhone());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setJoiningDate(student.getJoiningDate());
            existingStudent.setProfileImage(student.getProfileImage());

            return studentRepository.save(existingStudent);
        }

        return null;
    }

    @Override
    public void deleteStudent(Integer studentId) {
        studentRepository.deleteById(studentId);
    }
}