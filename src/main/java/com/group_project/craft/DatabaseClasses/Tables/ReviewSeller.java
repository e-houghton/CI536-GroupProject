package com.group_project.craft.DatabaseClasses.Tables;


import jakarta.persistence.*;

@Entity
@Table(name="tReviewSeller")
public class ReviewSeller {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewID;
    @ManyToOne
    @JoinColumn(name="reviewer")
    private User reviewer;
    @ManyToOne
    @JoinColumn(name="seller")
    private User seller;
    @Column(nullable = false)
    private double rating;
    @Column(length = 200)
    private String reviewText;

    protected ReviewSeller(){}
    public ReviewSeller(User reviewer, User seller, double rating, String reviewText) {
        this.reviewer = reviewer;
        this.seller = seller;
        this.rating = rating;
        this.reviewText = reviewText;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public int getReviewID() {
        return reviewID;
    }

    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }
}
