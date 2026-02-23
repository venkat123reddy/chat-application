package com.stem.chatapp.service;

import com.stem.chatapp.entity.Message;
import com.stem.chatapp.model.MessageDTO;

import java.util.List;

public interface MessageService {

    List<MessageDTO> getMessages(String receiveID,String senderID);

    MessageDTO sendMessage(MessageDTO messageDTO);
}
