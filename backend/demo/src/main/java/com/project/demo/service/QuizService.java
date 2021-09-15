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
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Integer id) {
         return quizRepository.findById(id).get();
    }

    public List<Quiz> findAllByTeacherId(Integer tid) {
        return quizRepository.findAllByTeacherId(tid);
    }

    public Quiz save(Quiz quiz){
        return quizRepository.save(quiz);
    }

}
