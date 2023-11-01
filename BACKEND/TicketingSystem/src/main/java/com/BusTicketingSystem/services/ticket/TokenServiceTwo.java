package com.BusTicketingSystem.services.ticket;



import com.BusTicketingSystem.dto.token.TokenDTO;
import com.BusTicketingSystem.models.token.Token;
import com.BusTicketingSystem.repositories.TokenRepository;
import com.BusTicketingSystem.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TokenServiceTwo {

    @Autowired
    TokenRepository TokenRepository;

    @Autowired
    ModelMapper modelMapper;


    public String saveToken(TokenDTO tokenDTO){
        if (TokenRepository.existsById(tokenDTO.getTokenID())){
            return VarList.RSP_DUPLICATED;
        }else {
            TokenRepository.save(modelMapper.map(tokenDTO, Token.class));
            return VarList.RSP_SUCCESS;
        }
    }
    public String updateToken(TokenDTO tokenDTO){
        if (TokenRepository.existsById(tokenDTO.getTokenID())){
            TokenRepository.save(modelMapper.map(tokenDTO, Token.class));
            return VarList.RSP_SUCCESS;

        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    public List<TokenDTO> getAllToken(){
        List<Token> tokenList = TokenRepository.findAll();
        return modelMapper.map(tokenList,new TypeToken<ArrayList<TokenDTO>>(){
        }.getType());
    }

    public TokenDTO searchToken(int empID){
        if (TokenRepository.existsById(empID)){
            Token token =TokenRepository.findById(empID).orElse(null);
            return modelMapper.map(token, TokenDTO.class);
        }else {
            return null;
        }
    }
    public String deleteToken(int empID){
        if (TokenRepository.existsById(empID)){
            TokenRepository.deleteById(empID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
