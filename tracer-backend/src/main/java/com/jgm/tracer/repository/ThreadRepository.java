package com.jgm.tracer.repository;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.User;
import com.jgm.tracer.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ThreadRepository extends JpaRepository<Thread, Long> {

    Thread findFirstByCreator(User user);

    Thread findFirstByVehicle(Vehicle vehicle);

}
