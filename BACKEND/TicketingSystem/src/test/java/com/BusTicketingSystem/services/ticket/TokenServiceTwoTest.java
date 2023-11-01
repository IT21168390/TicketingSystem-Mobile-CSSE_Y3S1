package com.BusTicketingSystem.services.ticket;

import com.BusTicketingSystem.dto.token.TokenDTO;
import com.BusTicketingSystem.models.token.Token;
import com.BusTicketingSystem.repositories.TokenRepository;
import com.BusTicketingSystem.services.ticket.TokenServiceTwo;
import com.BusTicketingSystem.util.VarList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class TokenServiceTwoTest {

    private TokenServiceTwo tokenService;

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        tokenRepository = Mockito.mock(TokenRepository.class);
        modelMapper = new ModelMapper();
        tokenService = new TokenServiceTwo();
        tokenService.TokenRepository = tokenRepository;
        tokenService.modelMapper = modelMapper;
    }

    @Test
    public void testSaveToken() {
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setTokenID(1);

        when(tokenRepository.existsById(1)).thenReturn(false);

        String result = tokenService.saveToken(tokenDTO);

        assertEquals(VarList.RSP_SUCCESS, result);
    }

    @Test
    public void testUpdateToken() {
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setTokenID(1);

        when(tokenRepository.existsById(1)).thenReturn(true);

        String result = tokenService.updateToken(tokenDTO);

        assertEquals(VarList.RSP_SUCCESS, result);
    }

    @Test
    public void testUpdateTokenNoDataFound() {
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setTokenID(1);

        when(tokenRepository.existsById(1)).thenReturn(false);

        String result = tokenService.updateToken(tokenDTO);

        assertEquals(VarList.RSP_NO_DATA_FOUND, result);
    }

    @Test
    public void testGetAllToken() {
        List<Token> tokenList = new ArrayList<>();
        tokenList.add(new Token());
        when(tokenRepository.findAll()).thenReturn(tokenList);

        List<TokenDTO> tokenDTOList = tokenService.getAllToken();

        assertEquals(tokenList.size(), tokenDTOList.size());
    }

    @Test
    public void testSearchToken() {
        Token token = new Token();
        token.setTokenID(1);

        when(tokenRepository.existsById(1)).thenReturn(true);
        when(tokenRepository.findById(1)).thenReturn(java.util.Optional.of(token));

        TokenDTO tokenDTO = tokenService.searchToken(1);

        assertEquals(token.getTokenID(), tokenDTO.getTokenID());
    }

    @Test
    public void testSearchTokenNotFound() {
        when(tokenRepository.existsById(1)).thenReturn(false);

        TokenDTO tokenDTO = tokenService.searchToken(1);

        assertEquals(null, tokenDTO);
    }

    @Test
    public void testDeleteToken() {
        when(tokenRepository.existsById(1)).thenReturn(true);

        String result = tokenService.deleteToken(1);

        assertEquals(VarList.RSP_SUCCESS, result);
    }

    @Test
    public void testDeleteTokenNoDataFound() {
        when(tokenRepository.existsById(1)).thenReturn(false);

        String result = tokenService.deleteToken(1);

        assertEquals(VarList.RSP_NO_DATA_FOUND, result);
    }
}
