package com.project.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.demo.dao.Quiz;
import com.project.demo.dao.QuizForm;
import com.project.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("/all")
    public ResponseEntity findAll() {
    return ResponseEntity.status(HttpStatus.OK).body(quizService.findAll());
}

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizForm quizForm) {
        Quiz quiz = quizForm.getQuiz();
        System.out.println(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.save(quiz));
    }
}
