package com.stem.chatapp.service;

import com.stem.chatapp.entity.Notification;
import com.stem.chatapp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public void sendNotification(String notifier, String message, String senderName) {

        Notification notification = new Notification();
        notification.setSender(senderName);
        notification.setMessage(message);
        notification.setReceiver(notifier);
        notificationRepository.save(notification);
    }
}
