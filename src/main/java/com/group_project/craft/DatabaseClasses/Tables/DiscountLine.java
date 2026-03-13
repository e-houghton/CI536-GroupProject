package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tDiscountLine")
public class DiscountLine {
    protected DiscountLine() {
    }

    public DiscountLine(int discountLineID, Discount discount, Product product) {
        this.discountLineID = discountLineID;
        this.discount = discount;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int discountLineID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Discount discount;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Product product;

    public int getDiscountLineID() {
        return discountLineID;
    }

    public void setDiscountLineID(int discountLineID) {
        this.discountLineID = discountLineID;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
