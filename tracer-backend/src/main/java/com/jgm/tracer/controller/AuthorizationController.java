package com.jgm.tracer.controller;

import com.jgm.tracer.model.User;
import com.jgm.tracer.model.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/resources")
@RequiredArgsConstructor
@CrossOrigin // Esto permite el acceso CORS de cualquier origen a todos los endpoints en este controlador
public class AuthorizationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationController.class);


    @GetMapping
    public ResponseEntity<String> sayHello() {
        logger.info("## AuthorizationController :: sayHello" );
        return ResponseEntity.ok("Here is your resource");
    }

    @GetMapping("/perfil")
    public ResponseEntity<UserResponse> miPerfil(@AuthenticationPrincipal User usuario) {
        logger.info("## AuthorizationController :: miPerfil" );

        UserResponse userResponse = new UserResponse(usuario.getUsername(), usuario.getBio(), usuario.getEmail(), usuario.getRole().toString());

        return  ResponseEntity.ok(userResponse);
    }


}