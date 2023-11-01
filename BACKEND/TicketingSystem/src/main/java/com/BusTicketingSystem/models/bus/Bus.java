package com.BusTicketingSystem.models.bus;

import com.BusTicketingSystem.models.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "Bus")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int busID;
    @OneToOne
    @JoinColumn(name = "driverID", referencedColumnName = "userID")
    private User driverID;
    @OneToOne
    @JoinColumn(name = "conductorID", referencedColumnName = "userID")
    private User conductorID;
    @ManyToOne
    @JoinColumn(name = "inspectorID", referencedColumnName = "userID")
    private User inspectorID;
    private int routeNumber;
}
