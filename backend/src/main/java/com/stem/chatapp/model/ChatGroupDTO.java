package com.stem.chatapp.model;

import com.stem.chatapp.entity.ChatUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatGroupDTO {

    private String groupName;
    private String createBy;
    private List<String> members;

}
