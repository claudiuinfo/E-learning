package com.project.demo.repository;

import com.project.demo.dao.Answer;
import com.project.demo.dao.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    @Query("select a from Answer a where a.questionId = ?1")
    List<Answer> findAllByQuestionId(Integer questionId);
    @Query("select a from Answer a where a.questionId = ?1 AND a.isCorrect = 1")
    List<Answer> findAllCorrectByQuestionId(Integer questionId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Answer a WHERE a.questionId = :questionId")
    Integer deleteByQuestionId(@Param("questionId") Integer questionId);
}
