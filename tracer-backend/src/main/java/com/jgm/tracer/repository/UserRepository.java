package com.jgm.tracer.repository;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.User;
import com.jgm.tracer.model.Vehicle;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByThreads(Thread thread);

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    User findFirstByFollowsAndIdNot(User user, final Long id);

    User findFirstByVehicles(Vehicle vehicle);

    List<User> findAllByThreads(Thread thread);

    List<User> findAllByFollows(User user);

    List<User> findAllByVehicles(Vehicle vehicle);

    boolean existsByUsernameIgnoreCase(String username);

}
