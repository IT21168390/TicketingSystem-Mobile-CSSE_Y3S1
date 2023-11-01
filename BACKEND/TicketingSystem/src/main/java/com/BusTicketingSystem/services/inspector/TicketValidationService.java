package com.BusTicketingSystem.services.inspector;

import com.BusTicketingSystem.dto.inspector.TicketValidationDTO;
import com.BusTicketingSystem.models.User;
import com.BusTicketingSystem.models.ticketValidation.TicketValidation;
import com.BusTicketingSystem.models.token.Token;
import com.BusTicketingSystem.repositories.TicketValidationRepository;
import com.BusTicketingSystem.repositories.TokenRepository;
import com.BusTicketingSystem.util.Constants.TokenConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketValidationService {
    @Autowired
    private TicketValidationRepository ticketValidationRepository;
    @Autowired
    private TokenRepository tokenRepository;

    public boolean validateToken(int tokenID) {
        Token token = tokenRepository.findById(tokenID).get();

        if(token!=null){
            if (token.getTokenBalance() > TokenConst.MINIMUM_BALANCE_LIMIT){
                return true;
            }
            else
                return false;
        }
        return false;
    }

    public TicketValidationDTO invalidTokensCountSubmission(TicketValidationDTO ticketValidationDTO) {
        User user = new User();
        user.setUserID(ticketValidationDTO.getInspectorID().getUserId());
        user.setRole(ticketValidationDTO.getInspectorID().getRole());
        user.setEmail(ticketValidationDTO.getInspectorID().getEmail());
        user.setAddress(ticketValidationDTO.getInspectorID().getAddress());
        user.setFirstName(ticketValidationDTO.getInspectorID().getFirstName());
        user.setLastName(ticketValidationDTO.getInspectorID().getLastName());

        TicketValidation ticketValidation = new TicketValidation();
        ticketValidation.setInspectorID(user);
        ticketValidation.setInvalidCount(ticketValidationDTO.getInvalidCount());

        TicketValidation ticketValidation_res = ticketValidationRepository.save(ticketValidation);

        TicketValidationDTO ticketValidationDTO_res = new TicketValidationDTO();
        ticketValidationDTO_res.setId(ticketValidation_res.getId());

        ticketValidationDTO_res.setInspectorID(ticketValidationDTO.getInspectorID());

        ticketValidationDTO_res.setInvalidCount(ticketValidation_res.getInvalidCount());

        return ticketValidationDTO_res;
    }
}
