package com.jgm.tracer.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;


@Getter
@Setter
public class PostVehicleDTO {
    private String brand;
    private String model;
    private LocalDate creationDate;
}



