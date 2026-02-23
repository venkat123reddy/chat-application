package com.stem.chatapp.service;


import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OnlineUsers {

    private final SimpUserRegistry userRegistry;

    public boolean userStatus(String userId) {
        return userRegistry.getUser(userId) != null;
    }
}
