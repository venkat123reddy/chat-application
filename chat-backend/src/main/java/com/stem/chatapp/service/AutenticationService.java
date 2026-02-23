package com.stem.chatapp.service;

import com.stem.chatapp.model.LoginInput;

public interface AutenticationService {

    boolean authenticate(LoginInput loginInput);
}
