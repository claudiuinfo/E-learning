package com.project.demo.dao;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="question")
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="quiz_id")
    int quizId;
    @Column(name="question")
    String question;
}
