package com.stem.chatapp.model;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageDTO {
    private String message;
    private String sender;
    private String receiver;
    private String messageId;
    private LocalDateTime timestamp;
}
