package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.model.dto.UserDTO;
import com.jgm.tracer.model.dto.UserResponse;
import com.jgm.tracer.model.dto.VehicleDTO;
import com.jgm.tracer.repository.ThreadRepository;
import com.jgm.tracer.repository.ThreadpostRepository;
import com.jgm.tracer.model.User;
import com.jgm.tracer.repository.UserRepository;
import com.jgm.tracer.util.NotFoundException;
import com.jgm.tracer.repository.VehicleRepository;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return (UserDetails) userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ThreadpostRepository threadpostRepository;

    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public User getByEmail(final String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(NotFoundException::new);
    }

    public User getByUsername(final String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(NotFoundException::new);
    }

    public User get(final Long id) {
        return userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public User create(final UserDTO userDTO) {
        final User user = modelMapper.map(userDTO, User.class);
        return userRepository.save(user);
    }

    public User update(final Long id, final UserDTO userDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        User updatedUser = modelMapper.map(userDTO, User.class);
        user.setUsername(updatedUser.getUsername());
        user.setBio(updatedUser.getBio());
        user.setPassword(updatedUser.getPassword());
        userRepository.save(user);
        return user;
    }

    public User followThread(final Long idThread, final Long idUser){
        Thread thread = threadRepository.getReferenceById(idThread);
        User user = userRepository.getReferenceById(idUser);

        user.getThreads().add(thread);

        return userRepository.save(user);
    }

    public User unFollowThread(final Long idThread, final Long idUser){
        Thread thread = threadRepository.getReferenceById(idThread);
        User user = userRepository.getReferenceById(idUser);

        user.getThreads().remove(thread);
        return userRepository.save(user);
    }

    public User followVehicle(final Long idVehicle, final Long idUser){
        Vehicle vehicle = vehicleRepository.getReferenceById(idVehicle);
        User user = userRepository.getReferenceById(idUser);

        user.getVehicles().add(vehicle);

        return userRepository.save(user);
    }

    public User unFollowVehicle(final Long idVehicle, final Long idUser){
        Vehicle vehicle = vehicleRepository.getReferenceById(idVehicle);
        User user = userRepository.getReferenceById(idUser);

        user.getVehicles().remove(vehicle);
        return userRepository.save(user);
    }

    public void delete(final Long id) {
        userRepository.deleteById(id);
    }

    public List<UserDTO> convertToDTOList(List<User> users) {
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private UserDTO convertToDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}

