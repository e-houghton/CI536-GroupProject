package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="tOrder")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Customer buyer;
    @Column(nullable = false)
    private Date purchaseDate;

    public Order(int orderID, Customer buyer, Date purchaseDate) {
        this.orderID = orderID;
        this.buyer = buyer;
        this.purchaseDate = purchaseDate;
    }

    protected Order() {
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public Customer getBuyer() {
        return buyer;
    }

    public void setBuyer(Customer buyer) {
        this.buyer = buyer;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
