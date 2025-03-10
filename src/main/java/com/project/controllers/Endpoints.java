package com.project.controllers;

import com.project.models.*;
import com.project.repositories.TaskRepository;
import com.project.repositories.TaskTimeRepository;
import com.project.repositories.TestCaseRepository;
import com.project.repositories.UserRepository;
import com.project.utility.AuthUtil;
import com.project.utility.Test;
import org.json.HTTP;
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

    @GetMapping(value = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllTasks(@RequestHeader("token") String token){

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

            TestCase test = task.getTestCases().stream().findFirst().get();

            tasksOut.add(Map.of(
                    "id", task.getId(),
                    "name", task.getName(),
                    "short", task.getShortdesc(),
                    "desc", task.getDescription(),
                    "points", task.getPoints(),
                    "input", test.getInput(),
                    "output", test.getOutput(),
                    "completed", completed
            ));
        }

        return ResponseEntity.status(HttpStatus.OK).body(tasksOut);
    }

    @GetMapping(value = "/tasks/{id}")
    public ResponseEntity<Object> getTaskById(@PathVariable("id") Long id, @RequestHeader("token") String token)    {
        Tasks taskData = taskRepository.findById(id).get();
        Set<TestCase> tmp= taskData.getTestCases();
        TestCase example = (TestCase) tmp.toArray()[0];
        List<Map<String, Object>> out = new ArrayList<>();
        out.add(Map.of(
                "id", taskData.getId(),
                "name", taskData.getName(),
                "desc", taskData.getDescription(),
                "input", example.getInput(),
                "output", example.getOutput()
        ));
        return ResponseEntity.status(HttpStatus.OK).body(out);

    };

    @PostMapping(value = "/tasks/{id}")
    public ResponseEntity<Object> submitUserCode(@PathVariable("id") Long id, @RequestBody String json, @RequestHeader("token") String token) throws IOException, InterruptedException {
        JSONObject body = new JSONObject(json);

        if (token.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing token");

        Users currentUser = AuthUtil.getUser(token, userRepository);
        if (currentUser == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        File file = new File("./temp/"+System.currentTimeMillis()/1000+".py");
        file.createNewFile();
        FileWriter fileWriter = new FileWriter(file);
        try {
            fileWriter.write(body.getString("code"));
            fileWriter.close();
        } catch (IOException | JSONException e) {
            throw new RuntimeException(e);
        }
        Tasks taskData = taskRepository.findById(id).get();
        Set<TestCase> testCases = taskData.getTestCases();
        List<String> outs = new ArrayList<>();
        int passedTestCases = 0;
        int i = 1;
        for(TestCase testCase : testCases){
            Test test = new Test(file.getName(), testCase.getInput());
            Thread thread = new Thread(test);
            outs.add("[" + i + "/" + testCases.size() + "] Running test...");
            outs.add("[" + i + "/" + testCases.size() + "] Input: " + testCase.getInput());
            thread.start();
            thread.join();
            String output = test.getOutput();

            outs.add(output);

            if (Objects.equals(output, testCase.getOutput())){
                outs.add("[" + i + "/" + testCases.size() + "] Passed!");
                //System.out.println("Test z "+testCase.getInput()+" i "+testCase.getOutput()+" przeszedł");
                passedTestCases++;
            }
            else{
                outs.add("[" + i + "/" + testCases.size() + "] Failed! ");
                outs.add("[" + i + "/" + testCases.size() + "] Expected: " + testCase.getOutput());
                System.out.println(testCase.getInput()+" "+testCase.getInput());
            }
            i++;
        }

        file.delete();

        if (passedTestCases==testCases.size()){
            Tasks currentTask = taskRepository.findById(id).get();
            taskTimeRepository.save(new TasksTime(currentUser, currentTask, Instant.now()));
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "output", String.join("\n", outs)));
        }

        return ResponseEntity.ok().body(Map.of(
                "success", false,
                "output", String.join("\n", outs)));
    }

    @GetMapping(value = "/scoreboard")
    public ResponseEntity<List<UserPoints>> scoreboard(@RequestHeader("token") String token){
        if (token.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        Users currentUser = AuthUtil.getUser(token, userRepository);
        if (currentUser == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        List<UserPoints> userPoints = userRepository.getUsersPoints();
        return ResponseEntity.ok().body(userPoints);
    }
}
