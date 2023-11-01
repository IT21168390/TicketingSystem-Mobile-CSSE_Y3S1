package com.BusTicketingSystem.dto.schedules;

import com.BusTicketingSystem.models.bus.Bus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ScheduleDTO {
    private int scheduleId;
    private Bus bus;
    private String routeNo;
    private String depTime;
    private String arrTime;
    private String frequency;
}

