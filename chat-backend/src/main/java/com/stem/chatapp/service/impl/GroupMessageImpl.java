package com.stem.chatapp.service.impl;

import com.stem.chatapp.entity.GroupMessage;
import com.stem.chatapp.repository.GroupMessageRepository;
import com.stem.chatapp.service.GroupMessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
public class GroupMessageImpl implements GroupMessageService {

    public final GroupMessageRepository groupMessageRepository;
    @Override
    public List<GroupMessage> getGroupMessages(String groupName) {
        return groupMessageRepository.findByGroupName(groupName);
    }

    @Override
    public GroupMessage saveMessage(GroupMessage groupMessage) {
        return groupMessageRepository.save(groupMessage);
    }
}
