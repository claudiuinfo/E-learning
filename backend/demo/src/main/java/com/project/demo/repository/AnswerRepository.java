package com.project.demo.repository;

import com.project.demo.dao.Answer;
import com.project.demo.dao.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    @Query("select a from Answer a where a.questionId = ?1")
    List<Answer> findAllByQuestionId(Integer questionId);
}
