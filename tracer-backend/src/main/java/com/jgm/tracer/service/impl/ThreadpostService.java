package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.dto.ThreadpostDTO;
import com.jgm.tracer.model.dto.createThreadpostDTO;
import com.jgm.tracer.repository.ThreadRepository;
import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.repository.ThreadpostRepository;
import com.jgm.tracer.model.User;
import com.jgm.tracer.repository.UserRepository;
import com.jgm.tracer.util.NotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ThreadpostService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ThreadpostRepository threadpostRepository;
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;

    public ThreadpostService() {
    }

    public List<Threadpost> findAll() {
        return threadpostRepository.findAll();
    }

    public Threadpost get(final Long id) {
        return threadpostRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final createThreadpostDTO threadpostDTO) {
        Threadpost threadpost = new Threadpost();
        threadpost.setMessage(threadpostDTO.getMessage());
        threadpost.setUser(userRepository.getReferenceById(threadpostDTO.getUser().longValue()));
        threadpost.setThread(threadRepository.getReferenceById(threadpostDTO.getThread().longValue()));
        threadpost.setCreationDate(LocalDateTime.now());
        return threadpostRepository.save(threadpost).getId();
    }

    public void update(final Long id, final ThreadpostDTO threadpostDTO) {
        final Threadpost threadpost = threadpostRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        Threadpost updatedThreadpost = modelMapper.map(threadpostDTO, Threadpost.class);
        threadpostRepository.save(updatedThreadpost);
    }

    public void delete(final Long id) {
        threadpostRepository.deleteById(id);
    }

    public List<ThreadpostDTO> convertToDTOList(List<Threadpost> threadspost) {
        return threadspost.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private ThreadpostDTO convertToDto(Threadpost threadpost) {
        return modelMapper.map(threadpost, ThreadpostDTO.class);
    }

}
