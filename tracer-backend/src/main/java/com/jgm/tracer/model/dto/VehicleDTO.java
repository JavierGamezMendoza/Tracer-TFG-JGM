package com.jgm.tracer.model.dto;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;


@Getter
@Setter
public class VehicleDTO {
    private Long id;
    private String brand;
    private String model;
    private LocalDate creationDate;
    private Set<UserDTO> followers;
    private Set<ThreadDTO> threads;
}



