package com.stem.chatapp.service.impl;

import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.model.LoginInput;
import com.stem.chatapp.repository.UserRepository;
import com.stem.chatapp.service.AutenticationService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AutenticationService {

    private final UserRepository userRepository;

    public AuthenticationServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean authenticate(LoginInput loginInput) {

        ChatUser chatUser = userRepository.findByEmail(loginInput.getUsername());
        if (chatUser != null && chatUser.getPassword().equals(loginInput.getPassword())) {
            
            return true;

        }
        return false;
    }
}
