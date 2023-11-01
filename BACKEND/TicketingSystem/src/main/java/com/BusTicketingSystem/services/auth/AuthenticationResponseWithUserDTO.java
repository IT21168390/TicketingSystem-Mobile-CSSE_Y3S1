package com.BusTicketingSystem.services.auth;

import com.BusTicketingSystem.dto.AuthenticationResponse;
import com.BusTicketingSystem.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponseWithUserDTO {
    private AuthenticationResponse authenticationResponse;
    private UserDTO userDTO;

}
