package com.stem.chatapp.controller;

import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.model.LoginInput;
import com.stem.chatapp.service.AutenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AutenticationService autenticationService;

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginInput loginInput){
        return new ResponseEntity<>(autenticationService.authenticate(loginInput), HttpStatus.OK);

    }
}
