package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tReviewProduct")
public class ReviewProduct {
    protected ReviewProduct() {
    }

    public ReviewProduct(User reviewer, Product product, double rating, String reviewText) {
        this.reviewer = reviewer;
        this.product = product;
        this.rating = rating;
        this.reviewText = reviewText;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewID;

    @ManyToOne
    @JoinColumn(name="reviewer")
    private User reviewer;

    @ManyToOne
    @JoinColumn(name="product")
    private Product product;

    @Column(nullable = false)
    private double rating;
    @Column(length = 200)
    private String reviewText;

    public int getReviewID() {
        return reviewID;
    }

    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
