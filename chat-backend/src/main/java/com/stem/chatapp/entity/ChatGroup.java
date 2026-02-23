package com.stem.chatapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long groupId;
    private String groupName;
    private String createdBy;
    private Date createdTime;
}
