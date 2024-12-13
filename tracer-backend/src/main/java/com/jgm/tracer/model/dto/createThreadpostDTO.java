package com.jgm.tracer.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class createThreadpostDTO {
    private String message;
    private Integer user;
    private Integer thread;
}
