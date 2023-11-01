package com.BusTicketingSystem.services.auth;

import com.BusTicketingSystem.dto.RegistrationDTO;
import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.models.User;
import com.BusTicketingSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(RegistrationDTO registrationDTO) {
        User user = new User();
        user.setFirstName(registrationDTO.getFirstName());
        user.setLastName(registrationDTO.getLastName());
        user.setEmail(registrationDTO.getEmail());
        user.setAddress(registrationDTO.getAddress());
        user.setPassword(new BCryptPasswordEncoder().encode(registrationDTO.getPassword()));

        User createdUser = userRepository.save(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setAddress(createdUser.getAddress());
        userDTO.setFirstName(createdUser.getFirstName());
        userDTO.setLastName(createdUser.getLastName());
        userDTO.setUserId(createdUser.getUserID());
        userDTO.setRole(createdUser.getRole());
        return userDTO;
    }

    public boolean emailExists(String email) {
        // Implement a check to verify if the email already exists in the database
        return userRepository.existsByEmail(email);
    }
}
