package com.project.controllers;

import com.project.models.Tasks;
import com.project.repositories.TaskRepository;
import com.project.utility.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class Endpoints {
    @Autowired
    TaskRepository taskRepository;

    @PostMapping(value = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllTasks(@RequestParam String token){
        if (AuthUtil.getUser(token) == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        List<Tasks> tasks = new ArrayList<>(taskRepository.findAll());
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.GET)
    public ResponseEntity<Tasks> getTaskById(@PathVariable("id") Long id )
    {
        Optional<Tasks> taskData = taskRepository.findById(id);
        return taskData.map(tasks -> new ResponseEntity<>(tasks, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    };



}
