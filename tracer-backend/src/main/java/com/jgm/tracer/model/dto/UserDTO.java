package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private Role role;
    private String email;
    private String bio;
    private String profilePic;
    private Boolean reliable;
    private List<UserInUserDTO> followers;
    private List<UserInUserDTO> follows;
}
