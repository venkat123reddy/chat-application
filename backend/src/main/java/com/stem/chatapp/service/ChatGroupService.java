package com.stem.chatapp.service;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.model.ChatGroupDTO;

import java.util.List;

public interface ChatGroupService {

    String createChatGroup(ChatGroupDTO chatGroupDTO);

    List<ChatGroup> getChatGroups();


}
