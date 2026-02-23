package com.stem.chatapp.entity;

import lombok.Getter;

public enum NotificationMessage {

    GROUP_CREATION( "%s added you in the %s"),
    GROUP_MESSAGE_SENT("%s sent you in the %s"),
    MESSAGE_SENT("%s sent message");

    @Getter
    public String message;
    NotificationMessage(String message) {
        this.message = message;
    }

}
