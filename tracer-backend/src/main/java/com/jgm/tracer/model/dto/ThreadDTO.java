package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.model.User;
import com.jgm.tracer.model.Vehicle;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ThreadDTO {
    private Long id;
    private String title;
    private String message;
    private LocalDateTime creationDate;
    private LocalDateTime closeDate;
    private Set<UserInUserDTO> users;
    private UserInUserDTO creator;
    private Set<ThreadpostDTO> threadposts;
}
