package com.project.demo.controller;

import com.project.demo.dao.Quiz;
import com.project.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;


@GetMapping("/all")
public ResponseEntity findAll() {
    return ResponseEntity.status(HttpStatus.OK).body(quizService.findAll());
}

@PostMapping
public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz){
    return ResponseEntity.status(HttpStatus.CREATED).body(quizService.save(quiz));

}



}
