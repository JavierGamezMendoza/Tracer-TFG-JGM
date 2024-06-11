package com.jgm.tracer.controller;

import com.jgm.tracer.model.User;
import com.jgm.tracer.model.dto.UserDTO;
import com.jgm.tracer.model.dto.UserResponse;
import com.jgm.tracer.service.impl.ThreadService;
import com.jgm.tracer.service.impl.UserService;
import com.jgm.tracer.service.impl.VehicleService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/v1/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ThreadService threadService;
    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(userService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<User> createUser(@RequestBody @Valid final UserDTO userDTO) {
        final User user = userService.create(userDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final UserDTO userDTO) {
        User user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") final Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/follow/{id}")
    @ApiResponse(responseCode = "201")
    public void followThread(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        threadService.follow(id, userDetails.getId());
    }

    @PatchMapping("/unfollow/{id}")
    @ApiResponse(responseCode = "201")
    public void unfollowThread(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        threadService.unfollow(id, userDetails.getId());
    }

}
