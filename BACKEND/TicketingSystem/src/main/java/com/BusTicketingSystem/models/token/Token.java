package com.BusTicketingSystem.models.token;

import com.BusTicketingSystem.models.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "Token")
public class Token {
    @Id
    @Column(name = "tokenID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tokenID;
    @OneToOne
    @JoinColumn(name = "userID")
    private User userID;
    private float tokenBalance;

}