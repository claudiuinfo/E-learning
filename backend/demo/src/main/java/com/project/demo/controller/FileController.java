package com.project.demo.controller;

import com.project.demo.dao.FileDB;
import com.project.demo.dao.MetadataFile;
import com.project.demo.dao.Student;
import com.project.demo.dao.Teacher;
import com.project.demo.message.ResponseFile;
import com.project.demo.message.ResponseMessage;
import com.project.demo.service.FileStorageService;
import com.project.demo.service.StudentService;
import com.project.demo.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin
public class FileController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private FileStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("ownerId") Integer ownerId, @RequestParam(name="ownerRole") String ownerRole) {
        String message = "";
        try {
            System.out.println(file);
            System.out.println(ownerId);
            System.out.println(ownerRole);
            MetadataFile metadataFile = new MetadataFile();
            metadataFile.setOwnerRole(ownerRole);
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();
            metadataFile.setPostDate(now);
            metadataFile.setOwnerId(ownerId);
            if (ownerRole.equals("student")) {
                Student student = studentService.getById(ownerId);
                metadataFile.setOwnerName(student.getName());
            } else if (ownerRole.equals("teacher")) {
                Teacher teacher = teacherService.getById(ownerId);
                metadataFile.setOwnerName(teacher.getName());
            }
            System.out.println(metadataFile);
            storageService.store(file, metadataFile);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();

            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length,
                    dbFile.getOwnerName(),
                    dbFile.getOwnerRole(),
                    dbFile.getPostDate());
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }
}
