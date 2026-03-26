package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="tOrder")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderID;

    @ManyToOne
    @JoinColumn(name="buyer")
    private Customer buyer;

    @Column(nullable = false)
    private Date purchaseDate;
    @OneToMany(mappedBy="order",
            targetEntity= OrderLine.class,
            fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private List<OrderLine> items = new ArrayList<>();

    public List<OrderLine> getItems() {
        return items;
    }

    public void setItems(List<OrderLine> items) {
        this.items = items;
    }
    public void addItem(OrderLine item){
        this.items.add(item);
    }
    public Order(Customer buyer, Date purchaseDate) {
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
