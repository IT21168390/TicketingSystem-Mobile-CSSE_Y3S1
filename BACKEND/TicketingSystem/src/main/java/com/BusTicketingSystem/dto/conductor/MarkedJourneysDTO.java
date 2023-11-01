package com.BusTicketingSystem.dto.conductor;

import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.dto.bus.BusDTO;
import com.BusTicketingSystem.dto.token.TokenDTO;
import lombok.Data;

@Data
public class MarkedJourneysDTO {
    private int journeyID;
    private TokenDTO tokenID;
    private UserDTO conductorID;
    private UserDTO passengerID;
    private String startPoint;
    private String endPoint;
    private float distance;
    private float cost;
    private BusDTO busID;
    private int routeID;


}
