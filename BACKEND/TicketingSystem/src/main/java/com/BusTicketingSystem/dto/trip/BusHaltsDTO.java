package com.BusTicketingSystem.dto.trip;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusHaltsDTO {
    private int haltID;
    private String haltName;
    private float distance;
}
