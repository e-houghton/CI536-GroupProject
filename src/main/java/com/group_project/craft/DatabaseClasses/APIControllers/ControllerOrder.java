package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceDiscount;
import com.group_project.craft.DatabaseClasses.Service.ServiceOrder;
import com.group_project.craft.DatabaseClasses.Tables.Discount;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class ControllerOrder extends ControllerParent<ServiceOrder, Order> {
    @Autowired
    ServiceOrder table;
    protected ServiceOrder getTable(){
        return table;
    }


}
