package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name = "tWishlist")
public class Wishlist {
    protected Wishlist() {
    }

    public Wishlist(int wishlistID, User owner, String name) {
        this.wishlistID = wishlistID;
        this.owner = owner;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int wishlistID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private User owner;

    @Column(nullable = false,length=50)
    private String name;


    public int getWishlistID() {
        return wishlistID;
    }

    public void setWishlistID(int wishlistID) {
        this.wishlistID = wishlistID;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
