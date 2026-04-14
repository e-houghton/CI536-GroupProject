package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.ReviewProduct;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface RepoProductReview extends JpaRepository<ReviewProduct, Integer> {
    ArrayList<ReviewProduct> findAllByReviewer(User reviewer);
    ArrayList<ReviewProduct> findAllByProduct(Product product);
    ArrayList<ReviewProduct> findAllByRatingBetween(double lb,double ub);
}
