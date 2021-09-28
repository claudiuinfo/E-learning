package com.project.demo.service;

import com.project.demo.dao.Answer;
import com.project.demo.dao.Question;
import com.project.demo.dao.QuestionWithAnswers;
import com.project.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
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
        return questionRepository.findById(id).get();
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public QuestionWithAnswers addQuestionWithAnswers(QuestionWithAnswers questionWithAnswers) {
        Question question = addQuestion(questionWithAnswers.getQuestion());
        List<Answer> answers = questionWithAnswers.getAnswers();

        QuestionWithAnswers newQuestionWithAnswers = new QuestionWithAnswers();
        newQuestionWithAnswers.setQuestion(question);
        List<Answer> newAnswers = new ArrayList<>();

        for (Answer answer : answers) {
            answer.setId(0);
            answer.setQuestionId(question.getId());
            newAnswers.add(answerService.addAnswer(answer));
        }

        newQuestionWithAnswers.setAnswers(newAnswers);
        return newQuestionWithAnswers;
    }

    public Question deleteQuestion(Integer id) {
        Question question = new Question();
        question.setId(id);
        questionRepository.deleteById(id);
        return question;
    }

    public QuestionWithAnswers editQuestionWithAnswers(Integer id,QuestionWithAnswers questionWithAnswers) {
        Question question1 = questionWithAnswers.getQuestion();
        question1.setId(id);
        Question question = addQuestion(question1);
        //question.setId(id);
        List<Answer> answers = questionWithAnswers.getAnswers();
        QuestionWithAnswers newQuestionWithAnswers = new QuestionWithAnswers();
        newQuestionWithAnswers.setQuestion(question);
        List<Answer> newAnswers = new ArrayList<>();
        for (Answer answer : answers) {
            answer.setId(0);
            answer.setQuestionId(question.getId());
            newAnswers.add(answerService.addAnswer(answer));

        }
        newQuestionWithAnswers.setAnswers(newAnswers);
        return newQuestionWithAnswers;
    }
}
