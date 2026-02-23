package com.stem.chatapp.service.impl;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.entity.ChatUser;
import com.stem.chatapp.entity.GroupMembers;
import com.stem.chatapp.model.ChatGroupDTO;
import com.stem.chatapp.repository.ChatGroupRepository;
import com.stem.chatapp.repository.GroupMemberRespository;
import com.stem.chatapp.service.ChatGroupService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ChatgroupServiceImpl implements ChatGroupService {

    private final ChatGroupRepository chatGroupRepository;
    private final GroupMemberRespository groupMemberRespository;


    @Override
    public String createChatGroup(ChatGroupDTO chatGroupDTO) {

        ChatGroup chatGroup = new ChatGroup();
        chatGroup.setCreatedBy(chatGroupDTO.getCreateBy());
        chatGroup.setGroupName(chatGroupDTO.getGroupName());
        chatGroupRepository.save(chatGroup);
        List<GroupMembers> groupMembers  = chatGroupDTO
                .getMembers()
                .stream()
                .map(user->{
                    GroupMembers groupMember = new GroupMembers();
                    groupMember.setGroupName(chatGroupDTO.getGroupName());
                    groupMember.setUserName(user);
                    return groupMember;
                }).toList();
        groupMemberRespository.saveAll(groupMembers);
        return "created chat group";
    }

    @Override
    public List<ChatGroup> getChatGroups() {
        return chatGroupRepository.findAll();
    }
}
