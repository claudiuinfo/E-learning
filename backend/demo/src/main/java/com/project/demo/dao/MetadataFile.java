package com.project.demo.dao;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MetadataFile {
    Integer ownerId;
    String ownerName;
    String ownerRole;
    LocalDateTime postDate;

    public MetadataFile() {
    }

    public MetadataFile(Integer ownerId, String ownerName, String ownerRole, LocalDateTime postDate) {
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerRole = ownerRole;
        this.postDate = postDate;
    }
}
