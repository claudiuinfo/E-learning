package com.project.demo.dao;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="teacher")
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="name")
    String name;
    @Column(name="username")
    String username;
    @Column(name="mail")
    String mail;
}
