package com.project.controllers;

import com.project.models.Users;
import com.project.repositories.UserRepository;
import com.project.utility.PasswordED;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
class Auth {
    PasswordED passwordED = new PasswordED();
    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Boolean> loginAuth(@RequestParam String username, @RequestParam String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isPresent()){
            return new ResponseEntity<>(passwordED.compare(password,usersData.get().getPassword()),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    };

    @PostMapping("/register")
    public ResponseEntity<Users> registerAuth(@RequestParam String username, @RequestParam String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isEmpty()){
            userRepository.save(new Users(username, passwordED.encrypt(password)));
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.IM_USED);
        }
    };
}
