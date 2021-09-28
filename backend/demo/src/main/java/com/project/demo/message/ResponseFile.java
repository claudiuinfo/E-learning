package com.project.demo.message;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseFile {
    private String name;
    private String url;
    private String type;
    private long size;
    private String ownerName;
    private String ownerRole;
    private LocalDateTime postDate;

    public ResponseFile(String name, String url, String type, long size) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
    }

    public ResponseFile(String name, String url, String type, long size, String ownerName, String ownerRole, LocalDateTime postDate) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
        this.ownerName = ownerName;
        this.ownerRole = ownerRole;
        this.postDate = postDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

}
