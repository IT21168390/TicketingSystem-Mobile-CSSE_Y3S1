package com.BusTicketingSystem.services.auth;

import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.models.User;
import com.BusTicketingSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(String email) {
        return userRepository.findFirstByEmail(email);
    }

    public UserDTO getUserDTO(String email) {
        User user = userRepository.findFirstByEmail(email);
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserId(user.getUserID());
        userDTO.setAddress(user.getAddress());
        userDTO.setRole(user.getRole());

        return userDTO;
    }
}
