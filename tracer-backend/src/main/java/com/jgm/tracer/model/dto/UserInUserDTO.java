package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInUserDTO {
    private Long id;
    private String username;
    private Role role;
    private String email;
    private String profilePic;
    private String bio;
    private Boolean reliable;
}
