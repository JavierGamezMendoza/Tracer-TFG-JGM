package com.jgm.tracer.service.auth;

import com.jgm.tracer.model.dto.JwtAuthenticationResponse;
import com.jgm.tracer.model.dto.SignUpRequest;
import com.jgm.tracer.model.dto.SigninRequest;

public interface AuthenticationService {

    /** REGISTRO */
    JwtAuthenticationResponse signup(SignUpRequest request);
    /** ACCESO a Token JWT */
    JwtAuthenticationResponse signin(SigninRequest request);
}