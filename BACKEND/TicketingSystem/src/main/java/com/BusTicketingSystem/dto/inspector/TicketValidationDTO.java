package com.BusTicketingSystem.dto.inspector;

import com.BusTicketingSystem.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketValidationDTO {
    private int id;
    private UserDTO inspectorID;
    private int invalidCount;

}
