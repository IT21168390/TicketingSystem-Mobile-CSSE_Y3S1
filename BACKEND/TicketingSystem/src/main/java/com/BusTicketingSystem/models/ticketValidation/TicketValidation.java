package com.BusTicketingSystem.models.ticketValidation;

import com.BusTicketingSystem.models.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "TicketValidation")
public class TicketValidation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "inspectorID", referencedColumnName = "userID")
    private User inspectorID;
    private int invalidCount;
}
