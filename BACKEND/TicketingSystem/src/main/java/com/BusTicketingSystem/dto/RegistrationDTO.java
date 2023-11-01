package com.BusTicketingSystem.dto;

import lombok.Data;

@Data
public class RegistrationDTO {
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String password;
}
