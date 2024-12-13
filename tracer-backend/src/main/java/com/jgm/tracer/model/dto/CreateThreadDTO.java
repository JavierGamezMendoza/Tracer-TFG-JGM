package com.jgm.tracer.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateThreadDTO {
    @NotBlank
    private String title;
    @NotBlank
    private String message;
    @NotNull
    private Long creatorId;
    @NotNull
    private Long vehicleId;
}
