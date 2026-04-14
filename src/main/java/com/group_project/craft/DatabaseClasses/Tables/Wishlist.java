package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tWishlist")
public class Wishlist {
    protected Wishlist() {
    }

    public Wishlist(User owner, String name) {
        this.owner = owner;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int wishlistID;

    @ManyToOne
    @JoinColumn(name="owner")
    private User owner;

    @Column(nullable = false,length=50)
    private String name;

    @OneToMany(mappedBy="wishlist",
            targetEntity= WishlistLine.class,
            fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private List<WishlistLine> items = new ArrayList<>();

    public List<WishlistLine> getItems() {
        return items;
    }
    public void addItem(WishlistLine item){
        this.items.add(item);
    }

    public void setItems(List<WishlistLine> items) {
        this.items = items;
    }

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
