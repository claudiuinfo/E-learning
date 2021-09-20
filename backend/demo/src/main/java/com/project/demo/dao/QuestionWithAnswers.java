package com.project.demo.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class QuestionWithAnswers {
    Question question;
    List<Answer> answers;

    public QuestionWithAnswers() {
    }

    public QuestionWithAnswers(Question question, List<Answer> answers) {
        this.question = question;
        this.answers = answers;
    }
}
