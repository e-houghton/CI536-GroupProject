package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceReviewProduct;
import com.group_project.craft.DatabaseClasses.Service.ServiceReviewSeller;
import com.group_project.craft.DatabaseClasses.Tables.ReviewProduct;
import com.group_project.craft.DatabaseClasses.Tables.ReviewSeller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review/seller")
public class ControllerReviewSeller extends ControllerParent<ServiceReviewSeller, ReviewSeller> {
    @Autowired
    ServiceReviewSeller table;
    protected ServiceReviewSeller getTable(){
        return table;
    }


}
