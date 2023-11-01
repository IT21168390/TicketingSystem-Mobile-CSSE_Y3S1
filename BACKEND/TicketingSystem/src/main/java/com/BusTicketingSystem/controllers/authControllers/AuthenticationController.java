package com.BusTicketingSystem.controllers.authControllers;

import com.BusTicketingSystem.dto.AuthenticationDTO;
import com.BusTicketingSystem.dto.AuthenticationResponse;
import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.services.auth.AuthenticationResponseWithUserDTO;
import com.BusTicketingSystem.services.auth.UserService;
import com.BusTicketingSystem.services.jwt.UserDetailsServiceImpl;
import com.BusTicketingSystem.util.JwtTokenUtil;
//import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class AuthenticationController {
    @Autowired
    private JwtTokenUtil jwtUtility;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserService userService;

    /*@PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationDTO authenticationDTO, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or Password");
        } catch (DisabledException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not valid.");
            return null;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());

        final String jwt = jwtUtility.generateToken(userDetails.getUsername());

        return new AuthenticationResponse(jwt);
    }*/
    @PostMapping("/login")
    public AuthenticationResponseWithUserDTO createAuthenticationToken(@RequestBody AuthenticationDTO authenticationDTO, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or Password");
        } catch (DisabledException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not valid.");
            return null; // You may want to handle this case differently
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());
        final String jwt = jwtUtility.generateToken(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse(jwt);
        UserDTO userDTO = userService.getUserDTO(authenticationDTO.getEmail());

        return new AuthenticationResponseWithUserDTO(authenticationResponse, userDTO);
    }


    @GetMapping("/login")
    public String abcc() {
        return "HELLO";
    }
}
