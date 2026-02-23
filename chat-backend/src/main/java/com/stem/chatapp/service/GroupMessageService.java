package com.stem.chatapp.service;

import com.stem.chatapp.entity.GroupMessage;

import java.util.List;

public interface GroupMessageService
{
    List<GroupMessage> getGroupMessages(String groupName);

    GroupMessage saveMessage(GroupMessage groupMessage);
}
