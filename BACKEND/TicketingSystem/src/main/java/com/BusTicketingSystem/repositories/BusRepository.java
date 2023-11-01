package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.models.bus.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusRepository extends JpaRepository<Bus, Integer> {
}
