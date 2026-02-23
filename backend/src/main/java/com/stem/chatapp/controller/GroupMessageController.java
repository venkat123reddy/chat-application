package com.stem.chatapp.controller;

import com.stem.chatapp.entity.GroupMessage;
import com.stem.chatapp.service.GroupMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/group-messages")
public class GroupMessageController {

    @Autowired
    private GroupMessageService groupMessageService;

    @GetMapping("/all/{groupName}")
    public List<GroupMessage> getGroupMessages(@PathVariable  String groupName){
        return groupMessageService.getGroupMessages(groupName);
    }
}
