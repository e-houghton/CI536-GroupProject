package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceReviewSeller;
import com.group_project.craft.DatabaseClasses.Service.ServiceSubcat;
import com.group_project.craft.DatabaseClasses.Tables.ReviewSeller;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subcat")
public class ControllerSubcat extends ControllerParent<ServiceSubcat, Subcategory> {
    @Autowired
    ServiceSubcat table;
    protected ServiceSubcat getTable(){
        return table;
    }


}
