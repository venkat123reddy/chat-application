package com.stem.chatapp.controller;

import com.stem.chatapp.entity.ChatGroup;
import com.stem.chatapp.entity.NotificationMessage;
import com.stem.chatapp.model.ChatGroupDTO;
import com.stem.chatapp.service.ChatGroupService;
import com.stem.chatapp.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/chat-group")
@AllArgsConstructor
public class ChatGroupController {

    private ChatGroupService chatGroupService;
    private NotificationService notificationService;

    @PostMapping("/create-group")
    public void createChatGroup(@RequestBody ChatGroupDTO chatGroupDTO) {
        chatGroupService.createChatGroup(chatGroupDTO);

        for(String userID: chatGroupDTO.getMembers()){

            String message = String.format(NotificationMessage.GROUP_CREATION.getMessage(),
                    chatGroupDTO.getCreateBy(),chatGroupDTO.getGroupName());
            notificationService.sendNotification(userID,message,chatGroupDTO.getCreateBy());
        }

    }

    @GetMapping
    public List<ChatGroup> getChatGroups() {
            return chatGroupService.getChatGroups();
    }
}
