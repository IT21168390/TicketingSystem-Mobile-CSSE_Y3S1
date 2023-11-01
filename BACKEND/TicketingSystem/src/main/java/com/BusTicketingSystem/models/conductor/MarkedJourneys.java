package com.BusTicketingSystem.models.conductor;

import com.BusTicketingSystem.models.User;
import com.BusTicketingSystem.models.bus.Bus;
import com.BusTicketingSystem.models.token.Token;

import javax.persistence.*;

@Entity
@Table(name = "MarkedJourneys")
public class MarkedJourneys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int journeyID;
    @ManyToOne
    @JoinColumn(referencedColumnName = "tokenID")
    private Token tokenID;
    @ManyToOne
    @JoinColumn(referencedColumnName = "userID")
    private User conductorID;
    @ManyToOne
    @JoinColumn(referencedColumnName = "userID")
    private User passengerID;
    private String startPoint;
    private String endPoint;
    private float distance;
    private float cost;
    @ManyToOne
    @JoinColumn(referencedColumnName = "busID")
    private Bus busID;
    private int routeID;

    public MarkedJourneys(Token tokenID, User conductorID, User passengerID, String startPoint, String endPoint, float distance, float cost, Bus busID, int routeID) {
        this.tokenID = tokenID;
        this.conductorID = conductorID;
        this.passengerID = passengerID;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.distance = distance;
        this.cost = cost;
        this.busID = busID;
        this.routeID = routeID;
    }

    public MarkedJourneys() {
    }

    public int getJourneyID() {
        return journeyID;
    }

    public Token getTokenID() {
        return tokenID;
    }

    public void setTokenID(Token tokenID) {
        this.tokenID = tokenID;
    }

    public User getConductorID() {
        return conductorID;
    }

    public void setConductorID(User conductorID) {
        this.conductorID = conductorID;
    }

    public User getPassengerID() {
        return passengerID;
    }

    public void setPassengerID(User passengerID) {
        this.passengerID = passengerID;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public Bus getBusID() {
        return busID;
    }

    public void setBusID(Bus busID) {
        this.busID = busID;
    }

    public int getRouteID() {
        return routeID;
    }

    public void setRouteID(int routeID) {
        this.routeID = routeID;
    }
}
