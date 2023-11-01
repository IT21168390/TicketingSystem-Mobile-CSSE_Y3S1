package com.BusTicketingSystem.repositories;

import com.BusTicketingSystem.models.schedules.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ScheduleRepository extends JpaRepository<Schedule,Integer> {
}