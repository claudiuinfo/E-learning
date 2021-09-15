package com.project.demo.dao;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class QuizRowMapper implements RowMapper<Quiz> {
    @Override
    public Quiz mapRow(ResultSet resultSet, int i) throws SQLException{
        Quiz quiz = new Quiz();
        quiz.setId(resultSet.getInt("id"));
        quiz.setIsActive(resultSet.getInt("is_active"));
        quiz.setTeacherId(resultSet.getInt("teacher_id"));
        quiz.setNoQuestions(resultSet.getInt("no_questions"));
        return quiz;
    }
}

