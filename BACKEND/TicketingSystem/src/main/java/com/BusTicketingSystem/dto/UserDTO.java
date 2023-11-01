package com.BusTicketingSystem.dto;

import com.BusTicketingSystem.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int userId;
    private String role;
    private String firstName;
    private String lastName;
    private String address;
    private String email;

    public UserDTO(User user) {
        this.userId = user.getUserID();
        this.role = user.getRole();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.address = user.getAddress();
        this.email = user.getEmail();
    }

    public UserDTO(int userId) {
        this.userId = userId;
    }
}
