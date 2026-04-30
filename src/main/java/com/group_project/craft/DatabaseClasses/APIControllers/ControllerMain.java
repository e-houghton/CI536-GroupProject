package com.group_project.craft.DatabaseClasses.APIControllers;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.group_project.craft.DatabaseClasses.Service.*;
import com.group_project.craft.DatabaseClasses.Tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("/db/findAll")
    public ArrayList<List> showAllData() {
        return new ArrayList<>(Arrays.asList(
                tCategory.findAll(),tCustomer.findAll(), tDiscount.findAll(), tOrder.findAll(), tProduct.findAll(), tReviewProduct.findAll(), tReviewSeller.findAll(), tSubcat.findAll(), tUser.findAll(), tWishlist.findAll()));
    }


}