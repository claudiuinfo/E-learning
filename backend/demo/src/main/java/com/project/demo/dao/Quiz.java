package com.project.demo.dao;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="quiz")
@Data
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="teacher_id")
    int teacherId;
    @Column(name="no_questions")
    int noQuestions;
    @Column(name="is_active")
    int isActive;




}
