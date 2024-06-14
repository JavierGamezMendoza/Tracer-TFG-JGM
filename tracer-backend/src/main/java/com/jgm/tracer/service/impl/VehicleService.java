package com.jgm.tracer.service.impl;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.repository.ThreadRepository;
import com.jgm.tracer.repository.UserRepository;
import com.jgm.tracer.util.NotFoundException;
import com.jgm.tracer.util.ReferencedWarning;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.model.dto.VehicleDTO;
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
public class VehicleService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle get(final Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public Vehicle create(final Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void update(final Long id, final VehicleDTO vehicleDTO) {
        final Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        Vehicle updatedVehicle = modelMapper.map(vehicleDTO, Vehicle.class);
        vehicle.setModel(updatedVehicle.getModel());
        vehicle.setCreationDate(updatedVehicle.getCreationDate());
        vehicle.setBrand(updatedVehicle.getBrand());
        vehicleRepository.save(vehicle);
    }

    public void delete(final Long id) {
        vehicleRepository.deleteById(id);
    }

    public List<VehicleDTO> convertToDTOList(List<Vehicle> vehicles) {
        return vehicles.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private VehicleDTO convertToDto(Vehicle vehicle) {
        return modelMapper.map(vehicle, VehicleDTO.class);
    }
}