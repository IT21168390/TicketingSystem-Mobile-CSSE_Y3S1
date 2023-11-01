package com.BusTicketingSystem.services.trip;

import com.BusTicketingSystem.dto.trip.BusHaltsDTO;
import com.BusTicketingSystem.models.trip.BusHalts;
import com.BusTicketingSystem.repositories.BusHaltsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusHaltsService {
    @Autowired
    private BusHaltsRepository busHaltsRepository;

    public List<BusHaltsDTO> getAllStops() {
        // Use the repository to fetch all bus halts from the database
        List<BusHalts> busHalts = busHaltsRepository.findAll();

        // Convert the List<BusHalts> to List<BusHaltsDTO>
        List<BusHaltsDTO> busHaltsDTOs = busHalts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return busHaltsDTOs;
    }

    private BusHaltsDTO convertToDTO(BusHalts busHalts) {
        BusHaltsDTO busHaltsDTO = new BusHaltsDTO();
        busHaltsDTO.setHaltID(busHalts.getHaltID());
        busHaltsDTO.setHaltName(busHalts.getHaltName());
        busHaltsDTO.setDistance(busHalts.getDistance());
        return busHaltsDTO;
    }
}
