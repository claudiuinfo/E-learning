package com.project.demo.service;

import com.project.demo.dao.Answer;
import com.project.demo.dao.Question;
import com.project.demo.dao.QuestionWithAnswers;
import com.project.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    AnswerService answerService;

    public List<Question> findAll() {
        return questionRepository.findAll();
    }

    public List<QuestionWithAnswers> findAllByQuizId(Integer quizId) {
        List<QuestionWithAnswers> questionWithAnswers = new ArrayList<>();
        List<Question> questions = questionRepository.findAllByQuizId(quizId);
        for (Question question : questions) {
            List<Answer> answers = answerService.findAllByQuestionId(question.getId());
            questionWithAnswers.add(new QuestionWithAnswers(question, answers));
        }
        System.out.println(questionWithAnswers);
        return questionWithAnswers;
    }

    public Question getById(Integer id) {
        return questionRepository.getById(id);
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
}
