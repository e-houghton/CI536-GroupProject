package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceReviews;
import com.group_project.craft.DatabaseClasses.Repository.RepoProductReview;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.ReviewProduct;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceReviewProduct implements InterfaceReviews<ReviewProduct,Product> {
    @Autowired
    RepoProductReview repo;

    @Override
    public List<ReviewProduct> findAll() {
        return repo.findAll();
    }






    @Override
    public void update(ReviewProduct c) {
        repo.save(c);
    }

    @Override
    public void updateByID(int id) {
        Optional<ReviewProduct> opt = repo.findById(id);
        opt.ifPresent(reviewProduct -> repo.save(reviewProduct));
    }

    @Override
    public void deleteByID(int id) {
        Optional<ReviewProduct> opt = repo.findById(id);
        opt.ifPresent(reviewProduct -> repo.delete(reviewProduct));
    }


    @Override
    public ReviewProduct findByID(int id) {
        Optional<ReviewProduct> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(ReviewProduct object) {
        repo.delete(object);
    }

    @Override
    public void addReview(User reviewer, Product reviewed, double rating, String reviewText) {
        repo.save(new ReviewProduct(reviewer,reviewed,rating,reviewText));
    }

    @Override
    public List<ReviewProduct> getAllByReviewed(Product reviewed) {
        return repo.findAllByProduct(reviewed);
    }

    @Override
    public List<ReviewProduct> getAllByReviewer(User reviewer) {
        return repo.findAllByReviewer(reviewer);
    }

    @Override
    public List<ReviewProduct> getAllByRatingBetween(double lb, double ub) {
        return repo.findAllByRatingBetween(lb,ub);
    }
}