package com.project.demo.controller;

import com.project.demo.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/answer")
public class AnswerController {
    @Autowired
    AnswerService answerService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(answerService.findAll());
    }

    @GetMapping("/all/{questionId}")
    public ResponseEntity findAllByQuestionId(@PathVariable(name="questionId") Integer questionId) {
        return ResponseEntity.status(HttpStatus.OK).body(answerService.findAllByQuestionId(questionId));
    }
}
