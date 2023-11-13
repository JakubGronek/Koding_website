package com.project.controllers;

import com.project.models.*;
import com.project.repositories.TaskRepository;
import com.project.repositories.TaskTimeRepository;
import com.project.repositories.TestCaseRepository;
import com.project.repositories.UserRepository;
import com.project.utility.AuthUtil;
import com.project.utility.Test;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.File;

import java.io.FileWriter;
import java.io.IOException;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api")
class Endpoints {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestCaseRepository testCaseRepository;
    @Autowired
    TaskTimeRepository taskTimeRepository;

    @PostMapping(value = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllTasks(@RequestBody String json){
        JSONObject body = new JSONObject(json);

        String token = body.optString("token");

        if (token.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing token");

        Users currentUser = AuthUtil.getUser(token, userRepository);
        if (currentUser == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");

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

    @PostMapping(value = "/tasks/{id}")
    public ResponseEntity<Object> submitUserCode(@PathVariable("id") Long id, @RequestBody String json) throws IOException, InterruptedException {
        JSONObject body = new JSONObject(json);

        String token = body.optString("token");

        if (token.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing token");

        Users currentUser = AuthUtil.getUser(token, userRepository);
        if (currentUser == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        File file = new File(System.currentTimeMillis()/1000+".py");
        file.createNewFile();
        FileWriter fileWriter = new FileWriter(file.getName());
        try {
            fileWriter.write(body.getString("code"));
            fileWriter.close();
        } catch (IOException | JSONException e) {
            throw new RuntimeException(e);
        }
        Tasks taskData = taskRepository.findById(id).get();
        Set<TestCase> testCases = taskData.getTestCases();
        int passedTestCases = 0;
        for(TestCase testCase : testCases){
            Test test = new Test(file.getName(), testCase.getInput());
            Thread thread = new Thread(test);
            thread.start();
            thread.join();
            String output = test.getOutput();
            if (Objects.equals(output, testCase.getOutput())){
                System.out.println("Test z "+testCase.getInput()+" i "+testCase.getOutput()+" przeszedł");
                passedTestCases++;
            }
            else{
                System.out.println(testCase.getInput()+" "+testCase.getInput());
            }
        }
        file.delete();
        if (passedTestCases==testCases.size()){
            Tasks currentTask = taskRepository.findById(id).get();
            taskTimeRepository.save(new TasksTime(currentUser, currentTask, Instant.now()));
            return ResponseEntity.ok().body("Gratulacje, Twój kod przeszedł wszystkie przypadki");
        }
        return ResponseEntity.ok().body("Niestety, Twój kod przeszedł "+passedTestCases+"/"+testCases.size()+" przypadków");
    }

    @RequestMapping(value = "/scoreboard", method = RequestMethod.GET)
    public ResponseEntity<List<UserPoints>> scoreboard(){
        List<UserPoints> userPoints = userRepository.getUsersPoints();
        return ResponseEntity.ok().body(userPoints);
    }
}
