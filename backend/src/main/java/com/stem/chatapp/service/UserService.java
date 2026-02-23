package com.stem.chatapp.service;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.model.UserInput;

import java.util.List;

public interface UserService {

    String createUser(UserInput userInput);
    String updateUser(UserInput userInput);
    List<ChatUser> getUsers();
    List<String> getGroups(String username);
}
