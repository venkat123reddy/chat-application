package com.stem.chatapp.service.impl;

import com.stem.chatapp.entity.Message;
import com.stem.chatapp.helper.MessageMapper;
import com.stem.chatapp.model.MessageDTO;
import com.stem.chatapp.repository.MessageRepository;
import com.stem.chatapp.service.MessageService;
import lombok.AllArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import org.apache.logging.log4j.util.PropertySource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {

    public final MessageRepository messageRepository;

    @Override
    public List<MessageDTO> getMessages(String senderID,String receiverID) {

        List<MessageDTO> rec = messageRepository.findBySendIDAndReceiveID(senderID,receiverID)
                .stream()
                .map(MessageMapper::mapToDTO)
                .toList();
        List<MessageDTO> sen = messageRepository.findBySendIDAndReceiveID(receiverID,senderID)
                .stream()
                .map(MessageMapper::mapToDTO)
                .toList();
        List<MessageDTO> res = new ArrayList<>();
        res.addAll(sen);
        res.addAll(rec);
        res.sort((x,y)->x.getTimestamp().compareTo(y.getTimestamp()));
        return res;
    }

    @Override
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        Message message = messageRepository.save(MessageMapper.mapToMessage(messageDTO));
        return MessageMapper.mapToDTO(message);
    }


}
