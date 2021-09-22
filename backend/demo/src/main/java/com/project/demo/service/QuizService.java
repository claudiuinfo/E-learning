package com.project.demo.service;


import com.project.demo.dao.Answer;
import com.project.demo.dao.QuestionWithAnswers;
import com.project.demo.dao.Quiz;
import com.project.demo.dao.Score;
import com.project.demo.repository.QuizRepository;
import com.project.demo.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class QuizService {

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    ScoreRepository scoreRepository;

    @Autowired
    AnswerService answerService;

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

    public Quiz getQuizByIdForStudent(Integer id, Integer studentId) {
        Quiz quiz = quizRepository.findById(id).get();
        quiz.updateStatus();
        Score score = findScoreByStudentId(studentId, quiz.getId());
        quiz.updateStatus(score);
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

    public Score submitQuiz(Integer quizId, Integer studentId, List<QuestionWithAnswers> questionWithAnswers) {
        Score score = new Score(quizId, studentId, 0);
        for (QuestionWithAnswers q : questionWithAnswers) {
            List<Answer> correctAnswers = answerService.findAllCorrectByQuestionId(q.getQuestion().getId());
            System.out.println("Correct Answers");
            System.out.println(correctAnswers);
            List<Answer> studentAnswers = q.getAnswers();
            System.out.println("Student Answers");
            System.out.println(studentAnswers);
            int nr = 0;
            if (correctAnswers.size() == studentAnswers.size()) {
                for (Answer correctAnswer : correctAnswers) {
                    for (Answer studentAnswer : studentAnswers) {
                        if (correctAnswer.getAnswer().equals(studentAnswer.getAnswer())) {
                            nr++;
                            System.out.println(correctAnswer.getAnswer());
                            break;
                        }
                    }
                }
                if (nr == correctAnswers.size()) {
                    score.setMaxScore(score.getMaxScore()+1);
                }
            }
        }
        System.out.println(score);
        scoreRepository.save(score);
        return score;
    }
}
