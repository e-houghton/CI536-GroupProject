package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tOrderLine")
public class OrderLine {
    protected OrderLine() {
    }

    public OrderLine(int orderLineID, Order orderID, Product product) {
        this.orderLineID = orderLineID;
        this.orderID = orderID;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderLineID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Order orderID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Product product;

    public int getOrderLineID() {
        return orderLineID;
    }

    public void setOrderLineID(int orderLineID) {
        this.orderLineID = orderLineID;
    }

    public Order getOrderID() {
        return orderID;
    }

    public void setOrderID(Order orderID) {
        this.orderID = orderID;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
