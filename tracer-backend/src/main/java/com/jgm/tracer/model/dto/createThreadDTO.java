package com.jgm.tracer.model.dto;

import java.time.LocalDateTime;
import java.util.List;

public class createThreadDTO {
    private Long id;
    private String title;
    private LocalDateTime creationDate;
    private LocalDateTime closeDate;
    private List<UserDTO> users;
    private UserDTO creator;
    private List<ThreadpostDTO> threadposts;
}
