package com.jgm.tracer.config;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jgm.tracer.model.Role;
import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.model.User;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.repository.ThreadRepository;
import com.jgm.tracer.repository.ThreadpostRepository;
import com.jgm.tracer.repository.UserRepository;
import com.jgm.tracer.repository.VehicleRepository;
import com.jgm.tracer.service.impl.PexelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.jgm.tracer.model.Thread;

@Component
public class InitializationData implements CommandLineRunner{

    private final boolean deleteAllVehicles = false;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private ThreadpostRepository threadpostRepository;

    @Autowired
    private PexelsService pexelsService;

    @Override
    public void run(String... args) throws Exception {

        // Usuario 1 - Rol USER
        User usuario1 = new User();
        usuario1.setUsername("Alice_Johnson");
        usuario1.setEmail("alice.johnson@example.com");
        usuario1.setBio("A bike lover and a cross entusiast");
        usuario1.setPassword(passwordEncoder.encode("password123"));
        usuario1.setProfilePic(pexelsService.getRandomImageURL());
        usuario1.setRole(Role.USER);
        usuario1.setReliable(true);
        usuarioRepository.save(usuario1);

        // Usuario 2 - Rol ADMIN
        User usuario2 = new User();
        usuario2.setUsername("FrankM_02");
        usuario2.setEmail("frank.miller@example.com");
        usuario2.setBio("Car Guy - R32 ");
        usuario2.setPassword(passwordEncoder.encode("password123"));
        usuario2.setProfilePic(pexelsService.getRandomImageURL());
        usuario2.setRole(Role.USER);
        usuario2.setReliable(false);
        usuarioRepository.save(usuario2);

        // Usuario 3 - Rol USER
        User usuario3 = new User();
        usuario3.setUsername("BobbieE30");
        usuario3.setEmail("bob.johnson@example.com");
        usuario3.setBio("Car Guy - R32 ");
        usuario3.setPassword(passwordEncoder.encode("password123"));
        usuario3.setProfilePic(pexelsService.getRandomImageURL());
        usuario3.setRole(Role.ADMIN);
        usuario3.setReliable(true);
        usuarioRepository.save(usuario3);


        Vehicle vehicle1 = new Vehicle();
        vehicle1.setBrand("BMW");
        vehicle1.setModel("E30");
        vehicle1.setCreationDate(LocalDate.of(1994, 1, 1));
        vehicleRepository.save(vehicle1);

        Vehicle vehicle2 = new Vehicle();
        vehicle2.setBrand("TOYOTA");
        vehicle2.setModel("MR2");
        vehicle2.setCreationDate(LocalDate.of(1998, 3, 21));
        vehicleRepository.save(vehicle2);

        Vehicle vehicle3 = new Vehicle();
        vehicle3.setBrand("MERCEDES");
        vehicle3.setModel("W123");
        vehicle3.setCreationDate(LocalDate.of(1992, 8, 16));
        vehicleRepository.save(vehicle3);



        Thread thread1 = new Thread();
        thread1.setTitle("Why is E30 so beautiful?");
        thread1.setCreator(usuario1);
        thread1.setCreationDate(LocalDateTime.now());
        thread1.setVehicle(vehicle1);
        threadRepository.save(thread1);

        Thread thread2 = new Thread();
        thread2.setTitle("Im the only one who has engine problems?");
        thread2.setCreator(usuario3);
        thread2.setCreationDate(LocalDateTime.now());
        thread2.setVehicle(vehicle1);
        threadRepository.save(thread2);

        Threadpost threadpost1 = new Threadpost();
        threadpost1.setUser(usuario2);
        threadpost1.setCreationDate(LocalDateTime.now());
        threadpost1.setMessage("You should specify the problem");
        threadpost1.setThread(threadRepository.getReferenceById(2L));
        threadpostRepository.save(threadpost1);
    }
}