package com.project.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
class Endpoints {
    @GetMapping
    public String home(){
        return "Home page";
    }

    @RequestMapping(value = "/tasks/{taskId}", method = RequestMethod.GET)
    public String task(@PathVariable int taskId){
        return Integer.toString(taskId);
    };
}
