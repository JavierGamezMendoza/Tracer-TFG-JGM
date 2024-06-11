package com.jgm.tracer.controller;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.Vehicle;
import com.jgm.tracer.model.dto.ThreadDTO;
import com.jgm.tracer.model.dto.VehicleDTO;
import com.jgm.tracer.service.impl.VehicleService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/api/v1/vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
public class VehicleController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private final VehicleService vehicleService;

    public VehicleController(final VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.findAll();
        List<VehicleDTO> vehiclesDTO = vehicleService.convertToDTOList(vehicles);
         return ResponseEntity.ok(vehiclesDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicle(@PathVariable final Long id) {
        Vehicle vehicle = vehicleService.get(id);


        // Mapea Vehicle a VehicleDTO
        VehicleDTO vehicleDTO = modelMapper.map(vehicle, VehicleDTO.class);
        return ResponseEntity.ok(vehicleDTO);
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody @Valid final VehicleDTO vehicleDTO) {
        final Vehicle createdVehicle = vehicleService.create(vehicleDTO);
        return new ResponseEntity<>(createdVehicle, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateVehicle(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final VehicleDTO vehicleDTO) {
        vehicleService.update(id, vehicleDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteVehicle(@PathVariable(name = "id") final Long id) {
        vehicleService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
