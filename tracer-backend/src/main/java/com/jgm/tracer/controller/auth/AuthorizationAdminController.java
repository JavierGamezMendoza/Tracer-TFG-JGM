package com.jgm.tracer.controller.auth;

import com.jgm.tracer.model.dto.UserDTO;
import com.jgm.tracer.model.dto.UserResponse;
import com.jgm.tracer.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class AuthorizationAdminController {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationAdminController.class);

    @Autowired
    private UserService userService;


    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserDTO>> showUsers() {
        logger.info("## AuthorizationAdminController :: showUsers" );
        List<UserDTO> userList = userService.findAll();
        return ResponseEntity.ok(userList);
    }
}