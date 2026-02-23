package com.stem.chatapp.controller;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.model.ChatGroupDTO;
import com.stem.chatapp.model.UserInput;
import com.stem.chatapp.service.OnlineUsers;
import com.stem.chatapp.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/user")
@Configuration
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class UserController {

    private final SimpUserRegistry userRegistry;
    private final OnlineUsers onlineUsers;
    private final UserService userService;

    @GetMapping("/status/{userId}")
    public boolean status(@PathVariable String userId) {
        return onlineUsers.userStatus(userId);
    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody UserInput input) {
        return userService.createUser(input);
    }

    @PostMapping("/updateUser")
    public String updateUser(@RequestBody UserInput input) {
        return "";
    }

    @GetMapping("/allUsers")
    public List<ChatUser> getUsers() {
        return userService.getUsers()
                .stream()
                .peek(user->{
                    if(onlineUsers.userStatus(user.getEmail()))
                        user.setStatus(true);
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/connected-users")
    public Set<String> getConnectedUsers() {

        return userRegistry.getUsers()
                .stream()
                .map(SimpUser::getName)
                .collect(Collectors.toSet());
    }

    @GetMapping("/user-groups/{useremail}")
    public List<String> getUserGroups(@PathVariable String useremail) {
        return userService.getGroups(useremail);
    }
}
