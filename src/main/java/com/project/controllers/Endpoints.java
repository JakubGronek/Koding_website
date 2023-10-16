package com.project.controllers;

import com.project.models.Tasks;
import com.project.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
class Endpoints {
    @Autowired
    TaskRepository taskRepository;

    @GetMapping
    public String home(){
        return "Home page";
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Tasks>> getAllTasks(@RequestParam(required = false) String name){
        try{
            List<Tasks> tasks = new ArrayList<>();

            if(name == null){
                tasks.addAll(taskRepository.findAll());
            }else{
                tasks.addAll(taskRepository.findByNameContaining(name));
            }

            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tasks, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.GET)
    public ResponseEntity<Tasks> getTaskById(@PathVariable("id") Long id )
    {
        Optional<Tasks> taskData = taskRepository.findById(id);
        return taskData.map(tasks -> new ResponseEntity<>(tasks, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    };
}
