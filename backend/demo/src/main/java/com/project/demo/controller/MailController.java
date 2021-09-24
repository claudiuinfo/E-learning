package com.project.demo.controller;

import com.project.demo.mail.SendMail;
import com.project.demo.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    MailService mailService;

    @PostMapping("/students/{quizId}")
    public ResponseEntity sendMail(@PathVariable(name="quizId") Integer quizId) {
        mailService.sendMailToAllStudents(quizId);
        return ResponseEntity.status(HttpStatus.OK).body("Mails send with success");
    }
}
