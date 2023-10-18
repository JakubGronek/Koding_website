package com.project.controllers;

import com.project.models.Tasks;
import com.project.repositories.TaskRepository;
import com.project.repositories.TaskTimeRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    TaskTimeRepository taskTimeRepository;

    @GetMapping("/tasks")
    public ResponseEntity<List<Tasks>> getAllTasks(@RequestBody String token){
        JSONObject jo = new JSONObject();
        try{
            List<Tasks> tasks = new ArrayList<>(taskRepository.findAll());
            System.out.println(token);
            for (Tasks task:tasks) {
                jo.put("name",task.getName());
                jo.put("desc", task.getShortdesc());
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
