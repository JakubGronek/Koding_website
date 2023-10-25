package com.project.controllers;

import com.project.models.Tasks;
import com.project.models.TasksTime;
import com.project.models.UserPoints;
import com.project.models.Users;
import com.project.repositories.TaskRepository;
import com.project.repositories.UserRepository;
import com.project.utility.AuthUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
class Endpoints {
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllTasks(@RequestBody String json){
        JSONObject body = new JSONObject(json);

        String token = body.optString("token");

        if (token.equals(""))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        Users currentUser = AuthUtil.getUser(token, userRepository);
        if (currentUser == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        List<Tasks> tasks = new ArrayList<>(taskRepository.findAll());
        List<Map<String, Object>> tasksOut = new ArrayList<>();

        for(Tasks task: tasks){
            boolean completed = false;
            for (TasksTime times: currentUser.getTasksTimes()) {
                if (times.getTask().equals(task)) {
                    completed = true;
                }
            }

            tasksOut.add(Map.of(
                    "id", task.getId(),
                    "name", task.getName(),
                    "short", task.getShortdesc(),
                    "desc", task.getDescription(),
                    "points", task.getPoints(),
                    "completed", completed
            ));
        }

        return ResponseEntity.status(HttpStatus.OK).body(tasksOut);
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.GET)
    public ResponseEntity<Tasks> getTaskById(@PathVariable("id") Long id )
    {
        Optional<Tasks> taskData = taskRepository.findById(id);
        return taskData.map(tasks -> new ResponseEntity<>(tasks, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    };

    @RequestMapping(value = "/scoreboard", method = RequestMethod.GET)
    public ResponseEntity<List<UserPoints>> scoreboard(){
        List<UserPoints> userPoints = userRepository.getUsersPoints();
        return ResponseEntity.ok().body(userPoints);
    }
}
