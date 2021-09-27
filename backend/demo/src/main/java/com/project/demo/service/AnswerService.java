package com.project.demo.service;

import com.project.demo.dao.Answer;
import com.project.demo.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    @Autowired
    AnswerRepository answerRepository;

    public List<Answer> findAll() {
        return answerRepository.findAll();
    }

    public List<Answer> findAllByQuestionId(Integer questionId) {
        return answerRepository.findAllByQuestionId(questionId);
    }

    public Answer getById(Integer id) {
        return answerRepository.getById(id);
    }

    public Answer addAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> findAllCorrectByQuestionId(Integer questionId) {
        return answerRepository.findAllCorrectByQuestionId(questionId);
    }

    public Integer deleteByQuestionId(Integer questionId){
        return answerRepository.deleteByQuestionId(questionId);
    }
}
