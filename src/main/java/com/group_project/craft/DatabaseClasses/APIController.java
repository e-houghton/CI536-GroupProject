package com.group_project.craft.DatabaseClasses;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.group_project.craft.DatabaseClasses.Service.*;
import com.group_project.craft.DatabaseClasses.Tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * API Controller. experimental code taken from https://www.geeksforgeeks.org/java/spring-boot-spring-data-jpa/
 */
@RestController
public class APIController {

    @Autowired
    ServiceCust customer;
    @Autowired
    ServiceCategory category;
    @Autowired
    ServiceDiscount discount;
    @Autowired
    ServiceOrder order;
    @Autowired
    ServiceProduct product;
    @Autowired
    ServiceReviewProduct reviewProduct;
    @Autowired
    ServiceReviewSeller reviewSeller;
    @Autowired
    ServiceSubcat subcat;
    @Autowired
    ServiceUser user;
    @Autowired
    ServiceWishlist wishlist;

    @GetMapping("/dbTestAdd")
    public String add() {
        /*
        customer.addCustomer(1);
        return "Added Customer!";*/
        return "to be added";
    }

    @GetMapping("/findall")
    public List<Category> getAllEmployee() {
        return category.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public Customer getEmployeeUsingId(@PathVariable int id) {
        return customer.findByID(id);
    }

    @GetMapping("/addCategory")
    public List<Category> addCat() {
        category.addCategory("this is a testCategory", "Test!");
        return category.findAll();
    }

    @GetMapping("/dropCategory/{id}")
    public List<Category> deleteCategoryByID(@PathVariable int id) {
        category.deleteByID(id);
        return category.findAll();
    }

    @GetMapping("/db/showAll")
    public ArrayList<List> showAllData() {

        return new ArrayList<>(Arrays.asList(
                category.findAll(),customer.findAll(),discount.findAll(),order.findAll(),product.findAll(),reviewProduct.findAll(),reviewSeller.findAll(),subcat.findAll(),user.findAll(),wishlist.findAll()));
    }


}