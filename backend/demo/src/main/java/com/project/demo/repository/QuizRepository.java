package com.project.demo.repository;

import com.project.demo.dao.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer> {
    @Query("select q from Quiz q where q.teacherId = ?1")
    List<Quiz> findAllByTeacherId(Integer tid);
}

