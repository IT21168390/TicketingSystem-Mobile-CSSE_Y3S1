package com.BusTicketingSystem.dto.bus;

import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.models.bus.Bus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BusDTO {
    private int busID;
    private UserDTO driverID;
    private UserDTO conductorID;
    private UserDTO inspectorID;
    private int routeNumber;

    public BusDTO(Bus bus) {
        this.busID = bus.getBusID();
        this.driverID = new UserDTO(bus.getDriverID()); // Convert User entity to UserDTO
        this.conductorID = new UserDTO(bus.getConductorID()); // Convert User entity to UserDTO
        this.inspectorID = new UserDTO(bus.getInspectorID()); // Convert User entity to UserDTO
        this.routeNumber = bus.getRouteNumber();
    }

    public BusDTO(int busID) {
        this.busID = busID;
    }
}
