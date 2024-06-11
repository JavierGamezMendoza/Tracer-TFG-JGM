package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.dto.UserDTO;
import com.jgm.tracer.model.dto.UserResponse;
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

    public List<UserResponse> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
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

    public void delete(final Long id) {
        userRepository.deleteById(id);
    }
}

