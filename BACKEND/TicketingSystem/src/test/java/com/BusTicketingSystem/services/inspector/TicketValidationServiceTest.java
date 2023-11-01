package com.BusTicketingSystem.services.inspector;

import com.BusTicketingSystem.models.token.Token;
import com.BusTicketingSystem.repositories.TokenRepository;
import com.BusTicketingSystem.util.Constants.TokenConst;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class TicketValidationServiceTest {

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private TicketValidationService ticketValidationService;

    @Test
    public void testValidateTokenWithValidToken() {
        int tokenID = 1;
        Token token = new Token();
        token.setTokenBalance(TokenConst.MINIMUM_BALANCE_LIMIT + 1);

        // Mock the behavior of the tokenRepository to return the token
        Mockito.when(tokenRepository.findById(anyInt())).thenReturn(Optional.of(token));

        boolean isValid = ticketValidationService.validateToken(tokenID);

        assertTrue(isValid);
    }

    @Test
    public void testValidateTokenWithInvalidToken() {
        int tokenID = 2;
        Token token = new Token();
        token.setTokenBalance(TokenConst.MINIMUM_BALANCE_LIMIT - 1);

        // Mock the behavior of the tokenRepository to return the token
        Mockito.when(tokenRepository.findById(anyInt())).thenReturn(Optional.of(token));

        boolean isValid = ticketValidationService.validateToken(tokenID);

        assertFalse(isValid);
    }

}
