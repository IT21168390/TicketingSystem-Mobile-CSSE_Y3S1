package com.BusTicketingSystem.util.Constants;

public class RestAPI {
    public static final String POST_PASSENGER_NEW_JOURNEY = "/conductor/newPassengerJourney";
    public static final String GET_BUS_STOPS = "/conductor/busHalts";
    public static final String CALCULATE_JOURNEY_COST = "/conductor/calculateCharge";

    public static final String VALIDATE_TOKEN = "/inspector/validateToken";
    public static final String SUBMIT_INVALID_TOKENS_COUNT = "/inspector/invalidTokensCount";
}
