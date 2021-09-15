package com.project.demo.controller;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Student;
import com.project.demo.service.QuizService;
import com.project.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService studentService;


    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.findAll());
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.save(student));

    }
}