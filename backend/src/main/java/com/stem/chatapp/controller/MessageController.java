package com.stem.chatapp.controller;

import com.stem.chatapp.model.MessageDTO;
import com.stem.chatapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/all")
    public List<MessageDTO> getAllMessages(@RequestParam("senderID") String senderID, @RequestParam("receiverID") String receiverID){

        return messageService.getMessages(senderID,receiverID);
    }
}
