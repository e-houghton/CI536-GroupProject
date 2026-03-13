package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tDiscount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int discountID;

    @Column(length = 50,nullable = false)
    private String name;

    @Column(length = 200)
    private String description;

    @Column(nullable = false)
    private int amount;
    protected Discount() {
    }
    public Discount(int discountID, String name, String description, int amount) {
        this.discountID = discountID;
        this.name = name;
        this.description = description;
        this.amount = amount;
    }

    public int getDiscountID() {
        return discountID;
    }

    public void setDiscountID(int discountID) {
        this.discountID = discountID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


}

