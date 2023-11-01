package com.BusTicketingSystem.dto.token;

import com.BusTicketingSystem.dto.UserDTO;
import com.BusTicketingSystem.models.token.Token;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDTO {
    private int tokenID;
    private UserDTO userID;
    private float tokenBalance;

    public TokenDTO(Token token) {
        this.tokenID = token.getTokenID();
        this.userID = new UserDTO(token.getUserID()); // Convert User entity to UserDTO
        this.tokenBalance = token.getTokenBalance();
    }

    public TokenDTO(int tokenID) {
        this.tokenID = tokenID;
    }
}
