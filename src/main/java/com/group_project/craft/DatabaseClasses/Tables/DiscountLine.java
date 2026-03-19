package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tDiscountLine")
public class DiscountLine {
    protected DiscountLine() {
    }

    public DiscountLine(Product product) {
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int discountLineID;

    @ManyToOne
    @JoinColumn(name="discount")
    private Discount discount;

    @ManyToOne
    @JoinColumn(name="product")
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
