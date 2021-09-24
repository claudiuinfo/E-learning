package com.project.demo.service;

import com.project.demo.dao.Score;
import com.project.demo.dao.Student;
import com.project.demo.mail.SendMail;
import com.project.demo.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    @Autowired
    ScoreRepository scoreRepository;

    @Autowired
    StudentService studentService;

    public List<Score> findAll() {
        return scoreRepository.findAll();
    }

    public List<Score> findAllByQuizId(Integer quizId) {
        List<Score> scores = scoreRepository.findAllByQuizId(quizId);
        int nr = 1;
        for (Score score : scores) {
            Student student = studentService.getById(score.getStudentId());
            score.setStudentName(student.getName());
            score.setId(nr++);
        }
        return scores;
    }
}
