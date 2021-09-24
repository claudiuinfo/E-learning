package com.project.demo.service;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Student;
import com.project.demo.repository.QuizRepository;
import com.project.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student save(Student student){
        return studentRepository.save(student);
    }

    public Student getById(Integer id) {
        return studentRepository.getById(id);
    }

}
