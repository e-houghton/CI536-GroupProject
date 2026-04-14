package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="tProduct")
public class Product {
    protected Product() {
    }

    public Product(String name, String description, Date uploadDate, User seller, String imageLocation, double price, Subcategory subcategory, boolean sold) {
        this.name = name;
        this.description = description;
        this.uploadDate = uploadDate;
        this.seller = seller;
        this.imageLocation = imageLocation;
        this.price = price;
        this.subcategory = subcategory;
        this.sold = sold;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int prodID;

    @Column(nullable = false,length=50)
    private String name;

    @Column(nullable = false,length=100)
    private String description;

    @Column(nullable = false)
    private Date uploadDate;

    @ManyToOne
    @JoinColumn(name="seller")
    private User seller;

    @Column(nullable = false,length=100)
    private String imageLocation;

    @Column(nullable = false)
    private double price;

    @ManyToOne
    @JoinColumn(name="subcategory")
    private Subcategory subcategory;

    @Column(nullable = false)
    private boolean sold;

    public int getProdID() {
        return prodID;
    }

    public void setProdID(int prodID) {
        this.prodID = prodID;
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

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public String getImageLocation() {
        return imageLocation;
    }

    public void setImageLocation(String imageLocation) {
        this.imageLocation = imageLocation;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }
}

