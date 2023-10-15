package com.project.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
class Auth {
    @GetMapping("/login")
    public String loginPage(){
        return "Login page";
    }

    @GetMapping("/register")
    public String registrationPage(){
        return "Register here";
    }
}
