package com.project.demo.controller;

import com.project.demo.dao.Student;
import com.project.demo.dao.Teacher;
import com.project.demo.service.StudentService;
import com.project.demo.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;


    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.findAll());
    }

    @PostMapping
    public ResponseEntity<Teacher> createStudent(@RequestBody Teacher teacher) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teacherService.save(teacher));

    }
}