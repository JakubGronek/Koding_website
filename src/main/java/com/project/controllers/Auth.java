package com.project.controllers;

import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
class Auth {
    @GetMapping("/login")
    public String loginPage(){
        return "Login page";
    }
    @PostMapping("/login")
    public String loginAuth(@RequestParam String username, @RequestParam String password){
        return "TMP";
    };

    @GetMapping("/register")
    public String registrationPage(){
        return "Register here";
    }
}
