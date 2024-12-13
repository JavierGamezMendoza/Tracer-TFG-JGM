package com.jgm.tracer.controller;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.model.dto.ThreadDTO;
import com.jgm.tracer.model.dto.ThreadpostDTO;
import com.jgm.tracer.model.dto.createThreadpostDTO;
import com.jgm.tracer.service.impl.ThreadpostService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/v1/threadposts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ThreadpostController {
    @Autowired
    private ThreadpostService threadpostService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<ThreadpostDTO>> getAllThreadposts() {
        List<Threadpost> threadspost = threadpostService.findAll();
        List<ThreadpostDTO> threadspostDTO = threadpostService.convertToDTOList(threadspost);

        return ResponseEntity.ok(threadspostDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadpostDTO> getThreadpost(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(modelMapper.map(threadpostService.get(id), ThreadpostDTO.class));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createThreadpost(
            @RequestBody @Valid final createThreadpostDTO createThreadpostDTO) {
        final Long createdId = threadpostService.create(createThreadpostDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateThreadpost(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final ThreadpostDTO threadpostDTO) {
        threadpostService.update(id, threadpostDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteThreadpost(@PathVariable(name = "id") final Long id) {
        threadpostService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
