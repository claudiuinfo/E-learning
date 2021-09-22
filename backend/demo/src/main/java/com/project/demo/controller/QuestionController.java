package com.project.demo.controller;

import com.project.demo.dao.QuestionWithAnswers;
import com.project.demo.dao.Quiz;
import com.project.demo.dao.QuizAndQuestionWithAnswers;
import com.project.demo.dao.QuizForm;
import com.project.demo.service.QuestionService;
import com.project.demo.service.QuizService;
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

    @Autowired
    QuizService quizService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.findAll());
    }

    @GetMapping("/all/{quizId}")
    public ResponseEntity findAllByQuizId(@PathVariable(name = "quizId") Integer quizId) {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.findAllByQuizId(quizId));
    }

    @PostMapping()
    public ResponseEntity addQuestion(@RequestBody QuizAndQuestionWithAnswers quizAndQuestionWithAnswers) {
        Quiz quiz = quizAndQuestionWithAnswers.getQuiz();
        QuestionWithAnswers questionWithAnswers = quizAndQuestionWithAnswers.getQuestionWithAnswers();
        System.out.println(quiz);
        System.out.println(questionWithAnswers);
        quizService.save(quiz);
        return ResponseEntity.status(HttpStatus.OK).body(questionService.addQuestionWithAnswers(questionWithAnswers));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity deleteQuiz(@PathVariable(name="questionId") Integer questionId, @RequestBody QuizForm quizForm) {
        System.out.println(questionId);
        System.out.println(quizForm);
        quizService.save(quizForm.getQuiz());
        return ResponseEntity.status(HttpStatus.OK).body(questionService.deleteQuestion(questionId));
    }
}
