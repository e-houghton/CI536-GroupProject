package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceCategory;
import com.group_project.craft.DatabaseClasses.Service.ServiceDiscount;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Discount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/discount")
public class ControllerDiscount extends ControllerParent<ServiceDiscount, Discount> {
    @Autowired
    ServiceDiscount table;
    protected ServiceDiscount getTable(){
        return table;
    }


}
