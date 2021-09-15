package com.project.demo.repository;

import com.project.demo.dao.Student;
import com.project.demo.dao.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Integer> {
}

