package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceOrder;
import com.group_project.craft.DatabaseClasses.Service.ServiceProduct;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ControllerProduct extends ControllerParent<ServiceProduct, Product> {
    @Autowired
    ServiceProduct table;
    protected ServiceProduct getTable(){
        return table;
    }


}
