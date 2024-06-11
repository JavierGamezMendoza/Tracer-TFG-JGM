package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.dto.ThreadDTO;
import com.jgm.tracer.model.dto.VehicleDTO;
import com.jgm.tracer.repository.ThreadRepository;
import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.repository.ThreadpostRepository;
import com.jgm.tracer.model.User;
import com.jgm.tracer.repository.UserRepository;
import com.jgm.tracer.util.NotFoundException;
import com.jgm.tracer.util.ReferencedWarning;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class ThreadService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private ThreadpostRepository threadpostRepository;

    public ThreadService() {}

    public List<Thread> findAll() {
        return threadRepository.findAll();
    }

    public Thread get(final Long id) {
        return threadRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Thread create(final Thread thread) {
        Thread newThread = modelMapper.map(thread, Thread.class);
        return threadRepository.save(newThread);
    }

    public Thread update(final Long id, Thread updatedThread) {
        final Thread thread = threadRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        updatedThread = modelMapper.map(updatedThread, Thread.class);
        return threadRepository.save(updatedThread);
    }

    public void delete(final Long id) {
        threadRepository.deleteById(id);
    }

    public User follow(final Long idThread, final Long idUser){
        Thread thread = threadRepository.getReferenceById(idThread);
        User user = userRepository.getReferenceById(idUser);

        user.getThreads().add(thread);

        return userRepository.save(user);
    }

    public User unfollow(final Long idThread, final Long idUser){
        Thread thread = threadRepository.getReferenceById(idThread);
        User user = userRepository.getReferenceById(idUser);

        user.getThreads().remove(thread);
        return userRepository.save(user);
    }

    public List<ThreadDTO> convertToDTOList(List<Thread> threads) {
        return threads.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private ThreadDTO convertToDto(Thread thread) {
        return modelMapper.map(thread, ThreadDTO.class);
    }

}
