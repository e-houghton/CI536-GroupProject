package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name = "tOrderLine")
public class OrderLine {
    protected OrderLine() {
    }

    public OrderLine(Order orderID, Product product) {
        this.order = orderID;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderLineID;

    @ManyToOne
    @JoinColumn(name = "order")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;

    public int getOrderLineID() {
        return orderLineID;
    }

    public void setOrderLineID(int orderLineID) {
        this.orderLineID = orderLineID;
    }

    public Order getOrderID() {
        return order;
    }

    public void setOrderID(Order orderID) {
        this.order = orderID;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
