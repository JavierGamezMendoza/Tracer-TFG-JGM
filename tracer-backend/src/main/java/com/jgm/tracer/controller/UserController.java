package com.jgm.tracer.controller;

import com.jgm.tracer.model.User;
import com.jgm.tracer.model.dto.*;
import com.jgm.tracer.service.impl.ThreadService;
import com.jgm.tracer.service.impl.UserService;
import com.jgm.tracer.service.impl.VehicleService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/v1/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ThreadService threadService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.findAll();
        List<UserDTO> usersDTO = userService.convertToDTOList(users);
        return ResponseEntity.ok(usersDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(name = "id") final Long id) {
        UserDTO userDTO = modelMapper.map(userService.get(id), UserDTO.class);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable(name = "id") final Long id,
                                              @RequestBody @Valid final PostUserDTO postUserDTO) {

        User user = userService.update(id, postUserDTO);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") final Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/follow/thread/{id}")
    @ApiResponse(responseCode = "201")
    public void followThread(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        try{
            userService.followThread(id, userDetails.getId());
        }catch (Exception e){
            System.out.println(e);
        }
    }

    @PatchMapping("/unfollow/thread/{id}")
    @ApiResponse(responseCode = "201")
    public void unfollowThread(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){

        try{
            userService.unFollowThread(id, userDetails.getId());
        }catch (Exception e){
            System.out.println(e);
        }
    }

    @PatchMapping("/follow/vehicle/{id}")
    @ApiResponse(responseCode = "201")
    public void followVehicle(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.followVehicle(id, userDetails.getId());
    }

    @PatchMapping("/unfollow/vehicle/{id}")
    @ApiResponse(responseCode = "201")
    public void unFollowVehicle(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.unFollowVehicle(id, userDetails.getId());
    }

    @PatchMapping("/follow/{id}")
    @ApiResponse(responseCode = "201")
    public void followUser(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.followUser(id, userDetails.getId());
    }

    @PatchMapping("/unfollow/{id}")
    @ApiResponse(responseCode = "201")
    public void unFollowUser(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.unFollowUser(id, userDetails.getId());
    }

    @PatchMapping("/block/{id}")
    @ApiResponse(responseCode = "201")
    public void blockUser(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.blockUser(id, userDetails.getId());
    }

    @GetMapping("/blocked")
    @ApiResponse(responseCode = "201")
    public ResponseEntity<List<UserInUserDTO>> blockedUsers( @AuthenticationPrincipal User userDetails){
       User user = userService.get(userDetails.getId());

       List<UserInUserDTO> blockedDTO = userService.convertToMinUserDTOList(user.getBlocked().stream().toList());
       return ResponseEntity.ok(blockedDTO);
    }

    @PatchMapping("/unblock/{id}")
    @ApiResponse(responseCode = "201")
    public void unBlockUser(
            @PathVariable(name = "id") final Long id,
            @AuthenticationPrincipal User userDetails
    ){
        userService.unBlockUser(id, userDetails.getId());
    }

}
