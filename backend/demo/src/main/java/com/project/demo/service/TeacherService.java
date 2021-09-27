package com.project.demo.service;

import com.project.demo.dao.Student;
import com.project.demo.dao.Teacher;
import com.project.demo.repository.StudentRepository;
import com.project.demo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    public Teacher save(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    public Teacher getById(Integer id) {
        return teacherRepository.findById(id).get();
    }

}
