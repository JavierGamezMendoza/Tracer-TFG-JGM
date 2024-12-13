package com.jgm.tracer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
//@ComponentScan(basePackages = "com.jgm.tracer.config")
public class TracerApplication {

    public static void main(final String[] args) {
        SpringApplication.run(TracerApplication.class, args);
    }

}
