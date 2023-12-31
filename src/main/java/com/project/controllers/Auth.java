package com.project.controllers;

import com.project.models.Users;
import com.project.repositories.UserRepository;
import com.project.utility.AuthUtil;
import org.json.JSONObject;
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
    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> loginAuth(@RequestBody String json) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        JSONObject body = new JSONObject(json);

        String username = body.optString("username");
        String password = body.optString("password");

        if (username.isEmpty() || password.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing username or password");

        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isPresent()){
            if (!AuthUtil.comparePasswordHash(password,usersData.get().getPassword()))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");

            String token = AuthUtil.createToken(usersData.get().getUsername());

            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "token", token
            ));
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    };

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> registerAuth(@RequestBody String json) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        JSONObject body = new JSONObject(json);

        String username = body.optString("username");
        String password = body.optString("password");

        if (username.isEmpty() || password.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);


        Optional<Users> usersData = userRepository.findById(username);
        if(usersData.isEmpty()){
            userRepository.save(new Users(username, AuthUtil.hashPassword(password)));
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.IM_USED);
        }
    };

    @PostMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUserInfo(@RequestHeader("token") String token) {
        if (token.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing token");

        String username = AuthUtil.getUsername(token);

        if (username == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing username");

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "username", username
        ));
    }
}
