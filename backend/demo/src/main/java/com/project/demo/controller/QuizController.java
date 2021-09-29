package com.project.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.demo.dao.*;
import com.project.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/all")
    public ResponseEntity findAll() {
    return ResponseEntity.status(HttpStatus.OK).body(quizService.findAll());
}

    @GetMapping("/all/{teacherId}")
    public ResponseEntity findAllByTeacherId(@PathVariable(name = "teacherId") Integer tid) {
        return ResponseEntity.status(HttpStatus.OK).body(quizService.findAllByTeacherId(tid));
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable(name = "quizId") Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(quizService.getQuizById(id));
    }

    @GetMapping("/student/{quizId}")
    public ResponseEntity<Quiz> getQuizByIdForStudent(@RequestParam(name="studentId") Integer studentId, @PathVariable(name = "quizId") Integer id) {
        System.out.println(studentId);
        return ResponseEntity.status(HttpStatus.OK).body(quizService.getQuizByIdForStudent(id, studentId));
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizForm quizForm) {
        Quiz quiz = quizForm.getQuiz();
        System.out.println(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.save(quiz));
    }

    @GetMapping("/all/active")
    public List<Quiz> findAllActive(@RequestParam(name="studentId") Integer studentId) {
        String sql = "SELECT * FROM quiz WHERE is_active <> 0";
        List<Quiz> quizList = this.jdbcTemplate.query("SELECT * FROM quiz WHERE is_active <> 0",new QuizRowMapper());
        for (Quiz quiz : quizList) {
            quiz.updateStatus();
            Score score = quizService.findScoreByStudentId(studentId, quiz.getId());
            quiz.updateStatus(score);
        }
        System.out.println(quizList);
        return quizList;
    }

    @GetMapping("/all/active/{teacherId}")
    @ResponseBody
    public List<Quiz> findActiveByTeacherId(@PathVariable(name = "teacherId") Integer tid, @RequestParam(name="studentId") Integer studentId){
        List<Quiz> quizList = this.jdbcTemplate.query("SELECT * FROM quiz WHERE is_active <> 0 AND teacher_id = " + tid,new QuizRowMapper());
        for (Quiz quiz : quizList) {
            quiz.updateStatus();
            Score score = quizService.findScoreByStudentId(studentId, quiz.getId());
            quiz.updateStatus(score);
        }
        System.out.println(quizList);
        return quizList;
    }

    @PostMapping("/submit/{quizId}")
    public ResponseEntity submitQuiz(@RequestParam(name="studentId") Integer studentId, @PathVariable(name = "quizId") Integer quizId, @RequestBody List<QuestionWithAnswers> questionWithAnswers) {
        System.out.println(questionWithAnswers);
        return ResponseEntity.status(HttpStatus.OK).body(quizService.submitQuiz(quizId, studentId, questionWithAnswers));
    }

}
