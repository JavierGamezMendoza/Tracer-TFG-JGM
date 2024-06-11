package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.User;

import java.util.List;

public class UserResponse {
    private String username;
    private String bio;
    private String email;
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

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String rol) {
        this.role = role;
    }
}