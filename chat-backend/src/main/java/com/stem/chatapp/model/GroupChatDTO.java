package com.stem.chatapp.model;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class GroupChatDTO {
    private String groupId;
    private String groupName;
    private String sender;
    private String message;
    private LocalDateTime timestamp;

}
