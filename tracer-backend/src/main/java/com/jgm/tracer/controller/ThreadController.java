package com.jgm.tracer.controller;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.User;
import com.jgm.tracer.model.dto.ThreadDTO;
import com.jgm.tracer.model.dto.createThreadDTO;
import com.jgm.tracer.service.impl.ThreadService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping(value = "/api/v1/threads", produces = MediaType.APPLICATION_JSON_VALUE)
public class ThreadController {

    @Autowired
    private final ThreadService threadService;

    @Autowired
    private ModelMapper modelMapper;

    public ThreadController(final ThreadService threadService) {
        this.threadService = threadService;
    }

    @GetMapping
    public ResponseEntity<List<ThreadDTO>> getAllThreads() {
        List<Thread> threads = threadService.findAll();
        List<ThreadDTO> threadsDTO = threadService.convertToDTOList(threads);

        return ResponseEntity.ok(threadsDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadDTO> getThread(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(modelMapper.map(threadService.get(id), ThreadDTO.class));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Thread> createThread(@RequestBody @Valid final ThreadDTO threadDTO) {
        final Thread thread = modelMapper.map(threadDTO, Thread.class);
        final Thread createdThread = threadService.create(thread);
        return new ResponseEntity<>(createdThread, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateThread(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final ThreadDTO threadDTO) {

        final Thread thread = threadService.get(id);
        thread.setTitle(threadDTO.getTitle());
        thread.setCloseDate(threadDTO.getCloseDate());

        threadService.update(id, thread);
        return ResponseEntity.ok(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Long> closeThread(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails) {

        if (userDetails == null) {
            // El usuario no está autenticado, devolver error o redirigir a página de inicio de sesión
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Obtener el ID del usuario autenticado
        Long authenticatedUserId = userDetails.getId();

        // Obtener el hilo
        Thread thread = (threadService.get(id));

        System.out.println(thread.getCreator().getId());
        System.out.println(authenticatedUserId);

        // Verificar si el usuario autenticado es el creador del hilo
        if (authenticatedUserId.equals(thread.getCreator().getId())) {
            // El usuario autenticado es el creador del hilo, cerrar el hilo
            thread.setCloseDate(LocalDateTime.now()); // Suponiendo que setCloseDate establece la fecha de cierre
            threadService.create(thread); // Guardar los cambios en el hilo
            return ResponseEntity.ok(id);
        } else {
            // El usuario autenticado no es el creador del hilo, devolver error
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }



    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteThread(@PathVariable(name = "id") final Long id) {
        threadService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
