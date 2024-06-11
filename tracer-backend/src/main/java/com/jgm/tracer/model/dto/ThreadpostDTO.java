package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ThreadpostDTO {
    private Long id;
    private String message;
    private LocalDateTime creationDate;
    private UserDTO user;

}
