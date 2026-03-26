package com.group_project.craft.DatabaseClasses.APIControllers;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.group_project.craft.DatabaseClasses.Service.*;
import com.group_project.craft.DatabaseClasses.Tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * API Controller. experimental code taken from https://www.geeksforgeeks.org/java/spring-boot-spring-data-jpa/
 */
@RestController
@RequestMapping("/api")
public class ControllerMain {

    @Autowired
    ServiceCust tCustomer;
    @Autowired
    ServiceCategory tCategory;
    @Autowired
    ServiceDiscount tDiscount;
    @Autowired
    ServiceOrder tOrder;
    @Autowired
    ServiceProduct tProduct;
    @Autowired
    ServiceReviewProduct tReviewProduct;
    @Autowired
    ServiceReviewSeller tReviewSeller;
    @Autowired
    ServiceSubcat tSubcat;
    @Autowired
    ServiceUser tUser;
    @Autowired
    ServiceWishlist tWishlist;


    @GetMapping("/findbyid/{id}")
    public Customer getEmployeeUsingId(@PathVariable int id) {
        return tCustomer.findByID(id);
    }

    @GetMapping("/addCategory")
    public List<Category> addCat() {
        tCategory.addCategory("this is a testCategory", "Test!");
        return tCategory.findAll();
    }

    @GetMapping("/dropCategory/{id}")
    public List<Category> deleteCategoryByID(@PathVariable int id) {
        tCategory.deleteByID(id);
        return tCategory.findAll();
    }

    @GetMapping("/db/findAll")
    public ArrayList<List> showAllData() {
        return new ArrayList<>(Arrays.asList(
                tCategory.findAll(),tCustomer.findAll(), tDiscount.findAll(), tOrder.findAll(), tProduct.findAll(), tReviewProduct.findAll(), tReviewSeller.findAll(), tSubcat.findAll(), tUser.findAll(), tWishlist.findAll()));
    }


}