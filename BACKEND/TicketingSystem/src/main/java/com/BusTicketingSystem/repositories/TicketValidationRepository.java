package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.models.ticketValidation.TicketValidation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketValidationRepository extends JpaRepository<TicketValidation, Integer> {
}
