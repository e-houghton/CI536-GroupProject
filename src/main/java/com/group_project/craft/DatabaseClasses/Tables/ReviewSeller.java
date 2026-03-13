package com.group_project.craft.DatabaseClasses.Tables;


import jakarta.persistence.*;

@Entity
@Table(name="tReviewSeller")
public class ReviewSeller {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewID;
    @ManyToOne
    @PrimaryKeyJoinColumn
    private User reviewer;
    @ManyToOne
    @PrimaryKeyJoinColumn
    private User reviewedSeller;
    @Column(nullable = false)
    private double rating;
    @Column(length = 200)
    private String reviewText;

    protected ReviewSeller(){}
    public ReviewSeller(int reviewID, User reviewer, User reviewedSeller, double rating, String reviewText) {
        this.reviewID = reviewID;
        this.reviewer = reviewer;
        this.reviewedSeller = reviewedSeller;
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

    public User getReviewedSeller() {
        return reviewedSeller;
    }

    public void setReviewedSeller(User reviewedSeller) {
        this.reviewedSeller = reviewedSeller;
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
