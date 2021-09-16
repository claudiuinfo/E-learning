package com.project.demo.service;


import com.project.demo.dao.Quiz;
import com.project.demo.dao.Score;
import com.project.demo.repository.QuizRepository;
import com.project.demo.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    ScoreRepository scoreRepository;

    public List<Quiz> findAll() {
        List<Quiz> quizzes = quizRepository.findAll();
        for (Quiz quiz : quizzes) {
            quiz.updateStatus();
        }
        System.out.println(quizzes);
        return quizzes;
    }

    public Quiz getQuizById(Integer id) {
        Quiz quiz = quizRepository.findById(id).get();
        quiz.updateStatus();
        return quiz;
    }

    public List<Quiz> findAllByTeacherId(Integer tid) {
        List<Quiz> quizzes = quizRepository.findAllByTeacherId(tid);
        for (Quiz quiz : quizzes) {
            quiz.updateStatus();
        }
        System.out.println(quizzes);
        return quizzes;
    }

    public Quiz save(Quiz quiz){
        System.out.println("My Quiz " + quiz);
        Quiz saveQuiz = quizRepository.save(quiz);
        saveQuiz.updateStatus();
        return saveQuiz;
    }

    public Score findScoreByStudentId(Integer studentId, Integer quizId) {
        return scoreRepository.findByStudentIdAndQuizId(studentId, quizId);
    }

}
