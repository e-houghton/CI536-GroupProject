package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceCategory;
import com.group_project.craft.DatabaseClasses.Service.ServiceCust;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class ControllerCategory extends ControllerParent<ServiceCategory, Category> {
    @Autowired
    ServiceCategory table;
    protected ServiceCategory getTable(){
        return table;
    }


}
