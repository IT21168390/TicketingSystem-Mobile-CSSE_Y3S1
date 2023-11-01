package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.models.conductor.MarkedJourneys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkedJourneysRepository extends JpaRepository<MarkedJourneys, Integer> {
}
