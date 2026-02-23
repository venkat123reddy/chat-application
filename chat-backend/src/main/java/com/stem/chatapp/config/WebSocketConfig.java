package com.stem.chatapp.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic","/queue"); // broker prefix
        config.setApplicationDestinationPrefixes("/app"); // app prefix for sending messages
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // this is your websocket endpoint
                .setAllowedOrigins("http://127.0.0.1:5500", "http://localhost:5500","http://localhost:5173/")
                .addInterceptors(new UserHandshakeInterceptor())
                .setHandshakeHandler(new CustomHandshakeHandler())
                .withSockJS(); // enable SockJS fallback
    }
}

