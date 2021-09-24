package com.project.demo.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="score")
@Data
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="student_id")
    int studentId;
    @Column(name="quiz_id")
    int quizId;
    @Column(name="max_score")
    int maxScore;
    @JsonInclude()
    @Transient
    String studentName;

    public Score() {
        maxScore = 0;
    }

    public Score(int quizId, int studentId, int maxScore) {
        this.quizId = quizId;
        this.studentId = studentId;
        this.maxScore = maxScore;
    }
}
