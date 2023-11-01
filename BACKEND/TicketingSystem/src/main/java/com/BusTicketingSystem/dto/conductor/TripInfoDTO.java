package com.BusTicketingSystem.dto.conductor;

import lombok.Data;

@Data
public class TripInfoDTO {
    private double tripCharge;
    private float travelledDistance;

    public TripInfoDTO(double tripCharge, float travelledDistance) {
        this.tripCharge = tripCharge;
        this.travelledDistance = travelledDistance;
    }
}
