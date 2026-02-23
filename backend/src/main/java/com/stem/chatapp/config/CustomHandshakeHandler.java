package com.stem.chatapp.config;


import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(
            ServerHttpRequest request,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) {

        //String username = request.getHeaders().getFirst("username");

        String username = (String) attributes.get("username");

        System.out.println("username:  "+username);

        return () -> username;  // lambda Principal
    }
}


