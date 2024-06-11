package com.jgm.tracer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Vehicle {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String brand;

    @Column(nullable = false, length = 40)
    private String model;

    @Column(nullable = false)
    private LocalDate creationDate;

    @ManyToMany(mappedBy = "vehicles")
    private Set<User> followers;

    @OneToMany(mappedBy = "vehicle")
    private Set<Thread> threads;

}
