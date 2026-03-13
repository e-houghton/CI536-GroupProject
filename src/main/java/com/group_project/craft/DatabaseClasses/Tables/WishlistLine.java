package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="tWishlistLine")
public class WishlistLine {
    protected WishlistLine(){}
    public WishlistLine(int wishlistLineID, Wishlist wishlist, Product productID, Date addedOn) {
        this.wishlistLineID = wishlistLineID;
        this.wishlist = wishlist;
        this.productID = productID;
        this.addedOn = addedOn;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int wishlistLineID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Wishlist wishlist;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Product productID;

    @Column(nullable = false)
    private Date addedOn;

    public int getWishlistLineID() {
        return wishlistLineID;
    }

    public void setWishlistLineID(int wishlistLineID) {
        this.wishlistLineID = wishlistLineID;
    }

    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }

    public Product getProductID() {
        return productID;
    }

    public void setProductID(Product productID) {
        this.productID = productID;
    }

    public Date getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(Date addedOn) {
        this.addedOn = addedOn;
    }
}
