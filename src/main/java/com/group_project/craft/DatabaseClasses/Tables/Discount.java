package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tDiscount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int discountID;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 200)
    private String description;

    @Column(nullable = false)
    private int amount;

    @OneToMany(mappedBy = "discount",
            targetEntity = DiscountLine.class,
            fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<DiscountLine> items = new ArrayList<>();

    protected Discount() {
    }

    public Discount(String name, String description, int amount) {
        this.name = name;
        this.description = description;
        this.amount = amount;
    }

    public List<DiscountLine> getItems() {
        return items;
    }

    public void setItems(List<DiscountLine> items) {
        this.items = items;
    }
    public void addItem(DiscountLine item){
        this.items.add(item);
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

