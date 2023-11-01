package com.BusTicketingSystem.models;

//import jakarta.persistence.*;
import lombok.Data;

import javax.persistence.*;
//import org.springframework.data.mongodb.core.index.Indexed;
//import org.springframework.data.mongodb.core.mapping.Document;

@Data
//@Document("Users")
@Entity
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    //private String userID;
    private int userID;
    private String role = "PASSENGER";
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String password;
}
