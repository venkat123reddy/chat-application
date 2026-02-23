package com.stem.chatapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInput {
    private String name;
    private String password;
    private String email;
    private String phone;
    private String about;
}
