package com.BusTicketingSystem.controllers.trip;

import com.BusTicketingSystem.dto.trip.BusHaltsDTO;
import com.BusTicketingSystem.services.trip.BusHaltsService;
import com.BusTicketingSystem.util.Constants.RestAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping
public class BusHaltsController {
    @Autowired
    private BusHaltsService busHaltsService;

    @GetMapping(RestAPI.GET_BUS_STOPS)
    public ResponseEntity<List<BusHaltsDTO>> getBusStops() {
        List<BusHaltsDTO> busHaltsDTOs = busHaltsService.getAllStops();
        return new ResponseEntity(busHaltsDTOs, HttpStatus.OK);
    }
}
