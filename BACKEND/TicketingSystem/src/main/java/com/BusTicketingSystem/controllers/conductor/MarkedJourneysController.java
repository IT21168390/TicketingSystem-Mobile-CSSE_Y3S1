package com.BusTicketingSystem.controllers.conductor;

import com.BusTicketingSystem.dto.conductor.MarkedJourneysDTO;
import com.BusTicketingSystem.dto.conductor.TripInfoDTO;
import com.BusTicketingSystem.services.conductor.MarkedJourneysService;
import com.BusTicketingSystem.util.Constants.RestAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
public class MarkedJourneysController {
    @Autowired
    private MarkedJourneysService markedJourneysService;

    private MarkedJourneysDTO markedJourneysDTO;

    @PostMapping(RestAPI.POST_PASSENGER_NEW_JOURNEY)
    public ResponseEntity<MarkedJourneysDTO> newPassengerJourney(@RequestBody MarkedJourneysDTO receivedJourneysDTO){
        markedJourneysDTO = markedJourneysService.createNewPassengerJourney(receivedJourneysDTO);
        return new ResponseEntity(markedJourneysDTO, HttpStatus.CREATED);
    }

    @GetMapping(RestAPI.CALCULATE_JOURNEY_COST)
    public TripInfoDTO calculateJourneyCost(@RequestParam int startPointID, @RequestParam int endPointID) throws Exception {
        double tripCharge = markedJourneysService.calculateTripCharge(startPointID, endPointID);
        float travelledDistance = markedJourneysService.getTravelledDistance(startPointID, endPointID);

        return new TripInfoDTO(tripCharge, travelledDistance);
    }
}
