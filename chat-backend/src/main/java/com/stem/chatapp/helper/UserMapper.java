package com.stem.chatapp.helper;

import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.model.UserInput;

public class UserMapper {

    public static ChatUser toUserEntity(UserInput userInput) {
        ChatUser chatUser = new ChatUser();
        chatUser.setAbout(userInput.getAbout());
        chatUser.setEmail(userInput.getEmail());
        chatUser.setUserName(userInput.getName());
        chatUser.setPassword(userInput.getPassword());
        chatUser.setPhone(userInput.getPhone());
        return chatUser;
    }
}
