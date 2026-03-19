package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="tWishlistLine")
public class WishlistLine {
    protected WishlistLine(){}
    public WishlistLine(Wishlist wishlist, Product productID, Date addedOn) {
        this.wishlist = wishlist;
        this.product = productID;
        this.addedOn = addedOn;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int wishlistLineID;

    @ManyToOne
    @JoinColumn(name="wishlist")
    private Wishlist wishlist;

    @ManyToOne
    @JoinColumn(name="product")
    private Product product;

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product productID) {
        this.product = productID;
    }

    public Date getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(Date addedOn) {
        this.addedOn = addedOn;
    }
}
