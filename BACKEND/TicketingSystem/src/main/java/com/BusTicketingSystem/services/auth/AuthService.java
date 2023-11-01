package com.BusTicketingSystem.services.auth;

import com.BusTicketingSystem.dto.RegistrationDTO;
import com.BusTicketingSystem.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(RegistrationDTO registrationDTO);

    public boolean emailExists(String email);
}
