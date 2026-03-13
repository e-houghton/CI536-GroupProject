package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tReviewProduct")
public class ReviewProduct {
    protected ReviewProduct() {
    }

    public ReviewProduct(int reviewID, User reviewer, Product reviewedProduct, double rating, String reviewText) {
        this.reviewID = reviewID;
        this.reviewer = reviewer;
        this.reviewedProduct = reviewedProduct;
        this.rating = rating;
        this.reviewText = reviewText;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewID;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private User reviewer;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Product reviewedProduct;

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

    public Product getReviewedProduct() {
        return reviewedProduct;
    }

    public void setReviewedProduct(Product reviewedProduct) {
        this.reviewedProduct = reviewedProduct;
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
