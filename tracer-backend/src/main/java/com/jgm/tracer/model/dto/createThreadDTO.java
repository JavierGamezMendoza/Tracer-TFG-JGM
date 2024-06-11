package com.jgm.tracer.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateThreadDTO {
    private String title;
    private String message;
    private Long creatorId;
    private Long vehicleId;
}
