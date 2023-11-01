package com.BusTicketingSystem.controllers.inspector;

import com.BusTicketingSystem.dto.inspector.TicketValidationDTO;
import com.BusTicketingSystem.services.inspector.TicketValidationService;
import com.BusTicketingSystem.util.Constants.RestAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin
public class TicketValidationController {
    @Autowired
    private TicketValidationService ticketValidationService;

    @GetMapping(RestAPI.VALIDATE_TOKEN)
    public boolean validateToken(@RequestParam int tokenID) {
        boolean isValid = ticketValidationService.validateToken(tokenID);
        return isValid;
    }

    @PostMapping(RestAPI.SUBMIT_INVALID_TOKENS_COUNT)
    public ResponseEntity<TicketValidationDTO> invalidTokensCountSubmission(@RequestBody TicketValidationDTO ticketValidationDTO) {
        TicketValidationDTO ticketValidationDTO_res = ticketValidationService.invalidTokensCountSubmission(ticketValidationDTO);

        return new ResponseEntity<>(ticketValidationDTO_res, HttpStatus.CREATED);
    }
}
