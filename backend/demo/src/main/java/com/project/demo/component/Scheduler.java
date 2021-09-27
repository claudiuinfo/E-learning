package com.project.demo.component;

import com.project.demo.dao.Quiz;
import com.project.demo.dao.Teacher;
import com.project.demo.mail.SendMail;
import com.project.demo.service.QuizService;
import com.project.demo.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.List;

@Component
public class Scheduler {
    @Autowired
    QuizService quizService;

    @Autowired
    TeacherService teacherService;

    //"h * m * s * 1000"
    @Scheduled(fixedRate = 10 * 1000)
    public void sendMailToTeachers() {
        SendMail sendMail = new SendMail();
        List<Quiz> quizList = quizService.findAll();
        for (Quiz quiz : quizList) {
            if (quiz.getStatus() == "expired" && quiz.getMailSent() == 0) {
                System.out.println(quiz);
                Teacher teacher = teacherService.getById(quiz.getTeacherId());
                sendMail.sendMail(teacher.getMail(), "Hello " + teacher.getName() + ", quiz with id " + quiz.getId()
                        + " is finished, you can enter to download the student results", "Quiz finished");
                quiz.setMailSent(1);
                quizService.save(quiz);
            }
        }
    }
}
