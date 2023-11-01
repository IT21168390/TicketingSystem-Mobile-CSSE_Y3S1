package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.dto.trip.BusHaltsDTO;
import com.BusTicketingSystem.models.trip.BusHalts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusHaltsRepository extends JpaRepository<BusHalts, Integer> {
}
