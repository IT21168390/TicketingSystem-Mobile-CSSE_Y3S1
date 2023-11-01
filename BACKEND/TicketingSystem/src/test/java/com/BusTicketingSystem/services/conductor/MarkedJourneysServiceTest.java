package com.BusTicketingSystem.services.conductor;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MarkedJourneysServiceTest {

    @Autowired
    private MarkedJourneysService markedJourneysService;

    @Test
    public void testCalculateTripCharge() throws Exception {
        int startPointID = 1;
        int endPointID = 2;

        double tripCharge = markedJourneysService.calculateTripCharge(startPointID, endPointID);

        // Use assertions to verify the results
        assertEquals(75, tripCharge, 0.01); // The appropriate delta for floating-point comparisons
    }
}
