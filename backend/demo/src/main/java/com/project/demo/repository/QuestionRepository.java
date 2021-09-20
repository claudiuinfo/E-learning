package com.project.demo.repository;

import com.project.demo.dao.Answer;
import com.project.demo.dao.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    @Query("select q from Question q where q.quizId = ?1")
    List<Question> findAllByQuizId(Integer quizId);
}
