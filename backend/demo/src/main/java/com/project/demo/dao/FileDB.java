package com.project.demo.dao;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "files")
public class FileDB {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;

    @Lob
    private byte[] data;

    @Column(name="owner_id")
    private Integer ownerId;

    @Column(name="owner_name")
    private String ownerName;

    @Column(name="owner_role")
    private String ownerRole;

    @Column(name="post_date")
    LocalDateTime postDate;

    public FileDB() {
    }

    public FileDB(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public FileDB(String name, String type, byte[] data, Integer ownerId, String ownerName, String ownerRole, LocalDateTime postDate) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerRole = ownerRole;
        this.postDate = postDate;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

}
