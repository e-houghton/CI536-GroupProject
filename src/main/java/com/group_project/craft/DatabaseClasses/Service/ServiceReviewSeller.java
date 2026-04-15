package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceReviews;
import com.group_project.craft.DatabaseClasses.Repository.RepoSellerReview;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import com.group_project.craft.DatabaseClasses.Tables.ReviewSeller;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceReviewSeller implements InterfaceReviews<ReviewSeller,User> {
    @Autowired
    RepoSellerReview repo;

    @Override
    public List<ReviewSeller> findAll() {
        return repo.findAll();
    }






    @Override
    public void save(ReviewSeller c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<ReviewSeller> opt = repo.findById(id);
        opt.ifPresent(reviewSeller -> repo.save(reviewSeller));
    }

    @Override
    public void deleteByID(int id) {
        Optional<ReviewSeller> opt = repo.findById(id);
        opt.ifPresent(reviewSeller -> repo.delete(reviewSeller));
    }


    @Override
    public ReviewSeller findByID(int id) {
        Optional<ReviewSeller> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(ReviewSeller object) {
        repo.delete(object);
    }

    @Override
    public void addReview(User reviewer, User reviewed, double rating, String reviewText) {
        repo.save(new ReviewSeller(reviewer,reviewed,rating,reviewText));
    }
    @Override
    public ReviewSeller addByObj(ReviewSeller obj){
        return repo.save(obj);
    }

    @Override
    public List<ReviewSeller> getAllByReviewed(User reviewed) {
        return repo.findAllBySeller(reviewed);
    }

    @Override
    public List<ReviewSeller> getAllByReviewer(User reviewer) {
        return repo.findAllByReviewer(reviewer);
    }

    @Override
    public List<ReviewSeller> getAllByRatingBetween(double lb, double ub) {
        return repo.findAllByRatingBetween(lb,ub);
    }
}