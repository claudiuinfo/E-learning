package com.project.demo.repository;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {
}
