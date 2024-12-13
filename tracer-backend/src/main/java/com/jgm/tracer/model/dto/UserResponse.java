package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserResponse {
    private String username;
    private String bio;
    private String email;
    private String profilePic;
    private List<User> followers;
    private List<User> follows;
    private List<Thread> threads;
    private String role;

    public UserResponse(String username, String bio, String email, String role) {
        this.username = username;
        this.bio = bio;
        this.email = email;
        this.role = role;
    }
}