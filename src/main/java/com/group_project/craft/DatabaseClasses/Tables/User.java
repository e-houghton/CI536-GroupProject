package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tUser")
public class User {
    protected User(){}
    public User(Long userID, String username, String password, Customer customer) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.customer = customer;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userID;
    @Column(nullable = false,length=50)
    private String username;
    @Column(nullable = false, length=50)
    private String password;
    // this is how relationships work. allows to do user.getCustomer().getName();
    @ManyToOne
    private Customer customer;

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
