package com.project.demo.dao;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    @Column(name="due_date")
    LocalDateTime dueDate;
    @JsonInclude()
    @Transient
    String status;

    public void setStatus() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        System.out.println(dtf.format(now));
        if (dueDate == null) {
            setStatus("invalid");
            return;
        }
        System.out.println(dtf.format(dueDate));
        if (dueDate.isAfter(now)) {
            setStatus("active");
        } else {
            setStatus("expired");
        }
        System.out.println(status);
    }
}
