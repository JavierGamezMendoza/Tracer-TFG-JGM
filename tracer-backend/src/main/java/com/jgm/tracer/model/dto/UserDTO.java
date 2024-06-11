package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private Role role;
    private String email;
    private String bio;
    private Boolean reliable;
}
