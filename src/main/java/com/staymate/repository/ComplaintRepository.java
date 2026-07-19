package com.staymate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.staymate.entity.Complaint;
import com.staymate.entity.Student;
import com.staymate.enums.ComplaintCategory;
import com.staymate.enums.ComplaintStatus;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {

    List<Complaint> findByStudent(Student student);

    List<Complaint> findByStatus(ComplaintStatus status);

    List<Complaint> findByCategory(ComplaintCategory category);

    long countByStatus(ComplaintStatus status);
    
    List<Complaint> findByStudentStudentId(Integer studentId);
}