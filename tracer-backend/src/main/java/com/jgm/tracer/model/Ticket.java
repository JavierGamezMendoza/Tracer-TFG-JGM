package com.jgm.tracer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    private LocalDateTime closeDate;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "infractor_id", nullable = false)
    private User infractor;

    @ManyToOne
    @JoinColumn(name = "thread_id", nullable= false)
    private Thread thread;
}
