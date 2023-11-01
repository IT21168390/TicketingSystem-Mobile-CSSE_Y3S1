package com.BusTicketingSystem.models.trip;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "BusHalts")
public class BusHalts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int haltID;
    private String haltName;
    private float distance;
}
