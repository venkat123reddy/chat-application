package com.stem.chatapp.service;

import com.stem.chatapp.entity.GroupMembers;
import com.stem.chatapp.entity.GroupMessage;
import com.stem.chatapp.entity.NotificationMessage;
import com.stem.chatapp.model.GroupChatDTO;
import com.stem.chatapp.model.MessageDTO;
import com.stem.chatapp.repository.GroupMemberRespository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class MessageProcessor {

    private GroupMemberRespository groupMemberRespository;

    private final OnlineUsers onlineUsers;

    private final NotificationService notificationService;


    private final SimpMessagingTemplate messagingTemplate;


    public void processMessage(MessageDTO messageDTO){

        if(onlineUsers.userStatus(messageDTO.getReceiver())) {

            messagingTemplate.convertAndSendToUser(
                    messageDTO.getReceiver(),  // username
                    "/queue/messages",
                    messageDTO);

        } else {
            String message = String.format(NotificationMessage.MESSAGE_SENT.getMessage(),messageDTO.getSender());
            notificationService.sendNotification(messageDTO.getReceiver(),message,messageDTO.getSender());
        }
    }

    public void processGroupMessage(GroupChatDTO groupMessage) {

        List<String> groupMembers = groupMemberRespository.findBygroupName(groupMessage.getGroupName())
                .stream()
                .map(GroupMembers::getUserName)
                .toList();

        for(String groupMember : groupMembers){
            if(onlineUsers.userStatus(groupMember) && !groupMember.equals(groupMessage.getSender())){
                messagingTemplate.convertAndSendToUser(
                        groupMember,  // username
                        "/queue/messages",
                        groupMessage);
            } else{

                String message = String.format(NotificationMessage.GROUP_MESSAGE_SENT.getMessage(),groupMember,groupMessage.getGroupName());
                notificationService.sendNotification(groupMember,message,groupMessage.getSender());
            }
        }


    }
}
