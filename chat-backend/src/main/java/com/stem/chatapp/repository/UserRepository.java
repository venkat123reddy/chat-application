package com.stem.chatapp.repository;

import com.stem.chatapp.entity.ChatUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<ChatUser, Long> {

    ChatUser findByUserName(String userName);
    ChatUser findByEmail(String email);

}
