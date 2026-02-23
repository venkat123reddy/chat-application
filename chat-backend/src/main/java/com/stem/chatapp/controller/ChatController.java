package com.stem.chatapp.controller;

import com.stem.chatapp.entity.GroupMessage;
import com.stem.chatapp.entity.Message;
import com.stem.chatapp.model.GroupChatDTO;
import com.stem.chatapp.model.MessageDTO;
import com.stem.chatapp.service.GroupMessageService;
import com.stem.chatapp.service.MessageProcessor;
import com.stem.chatapp.service.MessageService;
import com.stem.chatapp.service.OnlineUsers;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final GroupMessageService groupMessageService;
    private final MessageProcessor messageProcessor;
    private final OnlineUsers onlineUsers;

    @MessageMapping("/send")
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        messageProcessor.processMessage(messageDTO);
        log.info("Sent message to receiver: {}", messageDTO);
        messageService.sendMessage(messageDTO);
        return messageDTO;
    }


    @MessageMapping("/groupchat/send")
    public GroupChatDTO sendGroupMessage(GroupChatDTO groupChatDTO) {


        GroupMessage groupMessage = new GroupMessage();

        groupMessage.setGroupName(groupChatDTO.getGroupName());
        groupMessage.setMessage(groupChatDTO.getMessage());
        groupMessage.setSender(groupChatDTO.getSender());
        groupMessage.setDate(LocalDateTime.now());

        groupMessageService.saveMessage(groupMessage);

        log.info("Group message to receiver: {}", groupChatDTO);

        messageProcessor.processGroupMessage(groupChatDTO);
        return groupChatDTO;


    }
}
