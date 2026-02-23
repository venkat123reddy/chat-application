package com.stem.chatapp.helper;

import com.stem.chatapp.entity.Message;
import com.stem.chatapp.model.MessageDTO;

import java.time.LocalDateTime;

public class MessageMapper {

    public static MessageDTO mapToDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessage(message.getMessage());
        messageDTO.setReceiver(message.getReceiveID());
        messageDTO.setSender(message.getSendID());
        messageDTO.setTimestamp(message.getSentTime());
        return messageDTO;

    }

    public static Message mapToMessage(MessageDTO messageDTO) {
        Message message = new Message();
        message.setMessage(messageDTO.getMessage());
        message.setReceiveID(messageDTO.getReceiver());
        message.setSendID(messageDTO.getSender());
        message.setSentTime(LocalDateTime.now());
        return message;
    }
}
