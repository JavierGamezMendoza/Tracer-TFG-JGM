package com.jgm.tracer.config;

import com.jgm.tracer.model.Role;
import com.jgm.tracer.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    UserService userService;




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request ->

                                request

                                .requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/vehicles/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.GET, "/api/v1/threads/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.GET, "/api/v1/threadposts/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.GET, "/api/v1/users/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())


                                .requestMatchers(HttpMethod.POST, "/api/v1/threads/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.POST, "/api/v1/threadposts/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())


                                //.requestMatchers(HttpMethod.PUT, "/api/v1/vehicles/**").hasAuthority(Role.ADMIN.toString())
                                //.requestMatchers(HttpMethod.PUT, "/api/v1/engines/**").hasAuthority(Role.ADMIN.toString())
                                //.requestMatchers(HttpMethod.PUT, "/api/v1/brands/**").hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.PUT, "/api/v1/users/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())

                                .requestMatchers(HttpMethod.PATCH, "/api/v1/vehicles/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.PATCH, "/api/v1/threads/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.PATCH, "/api/v1/threadposts/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.PATCH, "/api/v1/users/**").hasAnyAuthority(Role.USER.toString(), Role.ADMIN.toString())

                                .requestMatchers(HttpMethod.POST, "/api/v1/vehicles/**").hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/vehicles/**").hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/threads/**").hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/threadposts/**").hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasAuthority(Role.ADMIN.toString())
                                .anyRequest().authenticated())

                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults()) // Configure CORS here with Customizer
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService.userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // Permitir solicitudes desde cualquier origen
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE")); // Permitir los métodos especificados
        configuration.setAllowedHeaders(Arrays.asList("*")); // Permitir todos los encabezados
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // Exponer el encabezado de autorización
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}