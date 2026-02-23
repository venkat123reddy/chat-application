package com.stem.chatapp.controller;

import com.stem.chatapp.entity.Notification;
import com.stem.chatapp.repository.NotificationRepository;
import com.stem.chatapp.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    public final NotificationService notificationService;

    private final NotificationRepository notificationRepository;


    @GetMapping("/{userId}")
    public ResponseEntity<List<String>> getNotifications(@PathVariable String userId) {
        log.info("Received request to get notifications for user: {}", userId);
        List<String> notifications = notificationRepository.findByReceiverAndStatus(userId,false)
                .stream()
                .map(Notification::getMessage)
                .toList();

        List<Notification> notificationsList = notificationRepository.findByReceiverAndStatus(userId,false)
                .stream()
                .map(notification -> {
                    notification.setStatus(true);
                    return notification;
                })
                .toList();
        //notificationRepository.saveAll(notificationsList);
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }
}
