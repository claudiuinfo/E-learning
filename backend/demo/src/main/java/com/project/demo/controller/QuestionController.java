package com.project.demo.controller;

import com.project.demo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.findAll());
    }

    @GetMapping("/all/{quizId}")
    public ResponseEntity findAllByQuizId(@PathVariable(name = "quizId") Integer quizId) {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.findAllByQuizId(quizId));
    }
}
