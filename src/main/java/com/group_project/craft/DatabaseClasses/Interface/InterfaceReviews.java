package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.User;

import java.util.List;

/**
 * shared between two review tables
 */
public interface InterfaceReviews<R,E> extends InterfaceParent<R>{
    void addReview(User reviewer, E reviewed, double rating, String reviewText);
    List<R> getAllByReviewed(E reviewed);
    List<R> getAllByReviewer(User reviewer);
    List<R> getAllByRatingBetween(double ratingLower,double ratingUpper);
}
