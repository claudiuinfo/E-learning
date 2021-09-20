package com.project.demo.dao;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="answer")
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="question_id")
    int questionId;
    @Column(name="answer")
    String answer;
    @Column(name="is_correct")
    int isCorrect;
}
