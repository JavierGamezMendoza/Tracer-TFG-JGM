package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.model.dto.*;
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

    public User update(final Long id, final PostUserDTO postUserDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        user.setUsername(postUserDTO.getUsername());
        user.setBio(postUserDTO.getBio());
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

    public User followUser(final Long idVehicle, final Long idUser){
        User followedUser = userRepository.getReferenceById(idVehicle);
        User followerUser = userRepository.getReferenceById(idUser);

        followerUser.getFollows().add(followedUser);

        return userRepository.save(followerUser);
    }

    public User unFollowUser(final Long idVehicle, final Long idUser){
        User followedUser = userRepository.getReferenceById(idVehicle);
        User followerUser = userRepository.getReferenceById(idUser);

        followerUser.getFollows().remove(followedUser);

        return userRepository.save(followerUser);
    }

    public User blockUser(final Long idBlockedUser, final Long idBlockerUser){
        User blockerUser = userRepository.getReferenceById(idBlockerUser);
        User blockedUser = userRepository.getReferenceById(idBlockedUser);

        blockerUser.getBlocked().add(blockedUser);

        return userRepository.save(blockerUser);
    }

    public User unBlockUser(final Long idBlockedUser, final Long idBlockerUser){
        User blockerUser = userRepository.getReferenceById(idBlockerUser);
        User blockedUser = userRepository.getReferenceById(idBlockedUser);

        blockerUser.getBlocked().remove(blockedUser);

        return userRepository.save(blockerUser);
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

    public List<UserInUserDTO> convertToMinUserDTOList(List<User> users) {
        return users.stream()
                .map(this::convertToMinUserDto)
                .collect(Collectors.toList());
    }
    private UserInUserDTO convertToMinUserDto(User user) {
        return modelMapper.map(user, UserInUserDTO.class);
    }
}

