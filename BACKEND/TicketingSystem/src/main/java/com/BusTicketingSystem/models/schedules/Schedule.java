package com.BusTicketingSystem.models.schedules;

import com.BusTicketingSystem.models.bus.Bus;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bus_id")
    private Bus bus;
    private String routeNo;
    private String depTime;
    private String arrTime;
    private String frequency;
}