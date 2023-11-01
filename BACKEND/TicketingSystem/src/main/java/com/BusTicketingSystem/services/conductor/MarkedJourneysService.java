package com.BusTicketingSystem.services.conductor;

import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.dto.bus.BusDTO;
import com.BusTicketingSystem.dto.conductor.MarkedJourneysDTO;
import com.BusTicketingSystem.dto.token.TokenDTO;
import com.BusTicketingSystem.models.User;
import com.BusTicketingSystem.models.bus.Bus;
import com.BusTicketingSystem.models.conductor.MarkedJourneys;
import com.BusTicketingSystem.models.token.Token;
import com.BusTicketingSystem.models.trip.BusHalts;
import com.BusTicketingSystem.repositories.*;
import com.BusTicketingSystem.util.Constants.ChargingRates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MarkedJourneysService {
    @Autowired
    private MarkedJourneysRepository markedJourneysRepository;

    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private BusRepository busRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusHaltsRepository busHaltsRepository;

    public MarkedJourneysDTO createNewPassengerJourney(MarkedJourneysDTO markedJourneysDTO) {
        MarkedJourneys markedJourneys = new MarkedJourneys();

        // Fetch the related entities from repositories
        Token token = tokenRepository.findById(markedJourneysDTO.getTokenID().getTokenID()).orElse(null);
        User conductor = userRepository.findById(markedJourneysDTO.getConductorID().getUserId()).orElse(null);
        User passenger = userRepository.findById(markedJourneysDTO.getPassengerID().getUserId()).orElse(null);
        Bus bus = busRepository.findById(markedJourneysDTO.getBusID().getBusID()).orElse(null);

        if (token != null) {
            // Calculate the new token balance after deducting the cost
            float currentBalance = token.getTokenBalance();
            float journeyCost = markedJourneysDTO.getCost();

            if (currentBalance >= journeyCost) {
                float newBalance = currentBalance - journeyCost;
                token.setTokenBalance(newBalance);
                // Update the token balance in the database
                tokenRepository.save(token);
            } else {
                // Handle insufficient balance error
                // Can throw an exception or return an error response as needed
            }
        } else {
            // Handle token not found error
            // Can throw an exception or return an error response as needed
        }

        // Set the fetched entities in the MarkedJourneys object
        markedJourneys.setTokenID(token);
        markedJourneys.setConductorID(conductor);
        markedJourneys.setPassengerID(passenger);
        markedJourneys.setStartPoint(markedJourneysDTO.getStartPoint());
        markedJourneys.setEndPoint(markedJourneysDTO.getEndPoint());
        markedJourneys.setDistance(markedJourneysDTO.getDistance());
        markedJourneys.setCost(markedJourneysDTO.getCost());
        markedJourneys.setBusID(bus);
        markedJourneys.setRouteID(markedJourneysDTO.getRouteID());

        // Save the MarkedJourneys object
        MarkedJourneys savedMarkedJourney = markedJourneysRepository.save(markedJourneys);

        // Create and return a DTO with the saved data
        MarkedJourneysDTO savedMarkedJourneyDTO = new MarkedJourneysDTO();
        savedMarkedJourneyDTO.setJourneyID(savedMarkedJourney.getJourneyID());
        savedMarkedJourneyDTO.setConductorID(new UserDTO(conductor)); // Convert to DTO
        savedMarkedJourneyDTO.setPassengerID(new UserDTO(passenger)); // Convert to DTO
        savedMarkedJourneyDTO.setTokenID(new TokenDTO(token)); // Convert to DTO
        savedMarkedJourneyDTO.setStartPoint(savedMarkedJourney.getStartPoint());
        savedMarkedJourneyDTO.setEndPoint(savedMarkedJourney.getEndPoint());
        savedMarkedJourneyDTO.setDistance(savedMarkedJourney.getDistance());
        savedMarkedJourneyDTO.setCost(savedMarkedJourney.getCost());
        savedMarkedJourneyDTO.setBusID(new BusDTO(bus)); // Convert to DTO
        savedMarkedJourneyDTO.setRouteID(savedMarkedJourney.getRouteID());

        return savedMarkedJourneyDTO;
    }

    //Method to calculate the distance between two selected locations.
    public float getTravelledDistance(int startPointID, int endPointID) throws Exception {
        BusHalts startHalt = busHaltsRepository.findById(startPointID).orElse(null);
        BusHalts endHalt = busHaltsRepository.findById(endPointID).orElse(null);

        if (startHalt == null || endHalt == null) {
            throw new Exception("Starting or stopping point not found.");
        }

        float travelledDistance = Math.abs(startHalt.getDistance() - endHalt.getDistance());

        return travelledDistance;
    }


    public double calculateTripCharge(int startPointID, int endPointID) throws Exception {
        // Fetch the BusHalts entries for the starting and stopping points
        BusHalts startHalt = busHaltsRepository.findById(startPointID).orElse(null);
        BusHalts endHalt = busHaltsRepository.findById(endPointID).orElse(null);

        if (startHalt == null || endHalt == null) {
            // Handle the case where the starting or stopping points are not found
            throw new Exception("Starting or stopping point not found.");
        }

        // Calculate the trip charge based on the difference in distances
        float travelledDistance = Math.abs(startHalt.getDistance() - endHalt.getDistance());

        double tripCharge = ChargingRates.BELOW_FIVE_KM * travelledDistance;
        if (travelledDistance>=ChargingRates.TIER_1 && travelledDistance<ChargingRates.TIER_2){
            tripCharge = ChargingRates.BETWEEN_FIVE_AND_TEN_KM * travelledDistance;
        }
        else if (travelledDistance>=ChargingRates.TIER_2 && travelledDistance<ChargingRates.TIER_3){
            tripCharge = ChargingRates.BETWEEN_TEN_AND_FIFTEEN_KM * travelledDistance;
        }
        else if (travelledDistance>=ChargingRates.TIER_3 && travelledDistance<ChargingRates.TIER_4){
            tripCharge = ChargingRates.BETWEEN_FIFTEEN_AND_TWENTY_KM * travelledDistance;
        }
        else if (travelledDistance>=ChargingRates.TIER_4) {
            tripCharge = ChargingRates.ABOVE_TWENTY_KM * travelledDistance;
        }

        return tripCharge;
    }
}
