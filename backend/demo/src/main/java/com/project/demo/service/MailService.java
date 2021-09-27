package com.project.demo.service;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Student;
import com.project.demo.dao.Teacher;
import com.project.demo.mail.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailService {

    @Autowired
    QuizService quizService;

    @Autowired
    StudentService studentService;

    @Autowired
    TeacherService teacherService;

    public void sendMailToAllStudents(Integer quizId) {
        SendMail sendMail = new SendMail();
        Quiz quiz = quizService.getQuizById(quizId);
        Teacher teacher = teacherService.getById(quiz.getTeacherId());
        List<Student> students = studentService.findAll();
        for (Student student : students) {
            sendMail.sendMail(student.getMail(), "Hello " + student.getName() + ", teacher " + teacher.getName() +
                    " create a new quiz with id " + quizId + " and due date " + quiz.getDueDate(), "New quiz is active");
        }

    }
}
