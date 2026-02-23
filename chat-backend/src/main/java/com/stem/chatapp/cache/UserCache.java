package com.stem.chatapp.cache;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UserCache {

    Map<String,Boolean> userCache = new ConcurrentHashMap<>();

    public void addUser(String username){
        userCache.put(username,true);
    }
    public void removeUser(String username){
        userCache.put(username,false);
    }

    public Boolean checkUser(String username){
        return userCache.get(username);
    }

}
