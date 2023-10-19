package com.project.controllers;

import com.project.models.Users;
import com.project.repositories.UserRepository;
import com.project.utility.AuthUtil;
import com.project.utility.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
class Auth {
    PasswordUtil passwordUtil = new PasswordUtil();

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> loginAuth(@RequestParam String username, @RequestParam String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isPresent()){
            if (!passwordUtil.compare(password,usersData.get().getPassword()))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

            String token = AuthUtil.createToken(usersData.get().getUsername());

            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "token", token
            ));
        }  {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    };

    @PostMapping("/register")
    public ResponseEntity<Users> registerAuth(@RequestParam String username, @RequestParam String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isEmpty()){
            userRepository.save(new Users(username, passwordUtil.encrypt(password)));
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.IM_USED);
        }
    };

    @PostMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUserInfo(@RequestParam String token) {
        String username = AuthUtil.getUser(token);

        if (username == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "username", username
        ));
    }
}
