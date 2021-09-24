package com.project.demo.repository;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer> {
    @Query("select s from Score s where s.studentId = ?1 and s.quizId =?2")
    Score findByStudentIdAndQuizId(Integer studentId, Integer quizId);
    @Query("select s from Score s where s.quizId =?1")
    List<Score> findAllByQuizId(Integer quizId);
}
