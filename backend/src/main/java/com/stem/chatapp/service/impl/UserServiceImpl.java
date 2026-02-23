package com.stem.chatapp.service.impl;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.entity.GroupMembers;
import com.stem.chatapp.helper.UserMapper;
import com.stem.chatapp.model.UserInput;
import com.stem.chatapp.repository.GroupMemberRespository;
import com.stem.chatapp.repository.UserRepository;
import com.stem.chatapp.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final GroupMemberRespository groupMemberRespository;


    @Override
    public String createUser(UserInput userInput) {

        log.info("createUser {}", userInput);
        ChatUser chatUser = UserMapper.toUserEntity(userInput);
        ChatUser user = userRepository.save(chatUser);
        return Objects.nonNull(user)? "user created" : "user already exists";
    }

    @Override
    public String updateUser(UserInput userInput) {
        return "";
    }


    @Override
    public List<ChatUser> getUsers() {
        return   userRepository.findAll();
    }

    @Override
    public List<String> getGroups(String email) {


        return groupMemberRespository.findByUserName(email)
                .stream()
                .map(GroupMembers::getGroupName)
                .toList();

    }
}
