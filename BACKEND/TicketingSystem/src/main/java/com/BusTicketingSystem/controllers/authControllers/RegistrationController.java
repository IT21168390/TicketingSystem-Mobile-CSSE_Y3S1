package com.BusTicketingSystem.controllers.authControllers;

import com.BusTicketingSystem.dto.RegistrationDTO;
import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/signup")
public class RegistrationController {
    @Autowired
    private AuthService authService;

    @PostMapping("/newUser")
    public ResponseEntity<?> signupUser(@RequestBody RegistrationDTO registrationDTO){
        // Check if the email already exists in the database
        if (authService.emailExists(registrationDTO.getEmail())) {
            return new ResponseEntity<>("Email already in use", HttpStatus.BAD_REQUEST);
        }

        UserDTO createdUser = authService.createUser(registrationDTO);
        if (createdUser==null){
            return new ResponseEntity<>("User not created", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
