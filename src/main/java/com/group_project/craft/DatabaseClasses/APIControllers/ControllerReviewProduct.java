package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceProduct;
import com.group_project.craft.DatabaseClasses.Service.ServiceReviewProduct;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.ReviewProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review/product")
public class ControllerReviewProduct extends ControllerParent<ServiceReviewProduct, ReviewProduct> {
    @Autowired
    ServiceReviewProduct table;
    protected ServiceReviewProduct getTable(){
        return table;
    }


}
