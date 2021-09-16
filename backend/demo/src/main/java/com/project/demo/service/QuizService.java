package com.project.demo.service;


import com.project.demo.dao.Quiz;
import com.project.demo.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuizRepository quizRepository;

    public List<Quiz> findAll() {
        List<Quiz> quizzes = quizRepository.findAll();
        for (Quiz quiz : quizzes) {
            quiz.setStatus();
        }
        System.out.println(quizzes);
        return quizzes;
    }

    public Quiz getQuizById(Integer id) {
        Quiz quiz = quizRepository.findById(id).get();
        quiz.setStatus();
        return quiz;
    }

    public List<Quiz> findAllByTeacherId(Integer tid) {
        List<Quiz> quizzes = quizRepository.findAllByTeacherId(tid);
        for (Quiz quiz : quizzes) {
            quiz.setStatus();
        }
        System.out.println(quizzes);
        return quizzes;
    }

    public Quiz save(Quiz quiz){
        System.out.println("My Quiz " + quiz);
        Quiz saveQuiz = quizRepository.save(quiz);
        saveQuiz.setStatus();
        return saveQuiz;
    }

}
