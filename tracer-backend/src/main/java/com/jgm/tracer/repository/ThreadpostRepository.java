package com.jgm.tracer.repository;

import com.jgm.tracer.model.Thread;
import com.jgm.tracer.model.Threadpost;
import com.jgm.tracer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ThreadpostRepository extends JpaRepository<Threadpost, Long> {

    Threadpost findFirstByThread(Thread thread);

    Threadpost findFirstByUser(User user);

}
