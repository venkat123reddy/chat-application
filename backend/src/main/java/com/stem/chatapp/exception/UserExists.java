package com.stem.chatapp.exception;

public class UserExists  extends Exception{

    public UserExists(String message){
        super(message);
    }
}
