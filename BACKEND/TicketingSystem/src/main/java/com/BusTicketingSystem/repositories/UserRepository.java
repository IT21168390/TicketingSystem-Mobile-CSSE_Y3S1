package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.models.User;
//import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findFirstByEmail(String email);

    boolean existsByEmail(String email);

}
