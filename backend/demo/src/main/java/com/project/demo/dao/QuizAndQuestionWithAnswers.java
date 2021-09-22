package com.project.demo.dao;

import lombok.Data;

@Data
public class QuizAndQuestionWithAnswers {
    Quiz quiz;
    QuestionWithAnswers questionWithAnswers;

    public QuizAndQuestionWithAnswers() {

    }

    public QuizAndQuestionWithAnswers(Quiz quiz, QuestionWithAnswers questionWithAnswers) {
        this.quiz = quiz;
        this.questionWithAnswers = questionWithAnswers;
    }
}
