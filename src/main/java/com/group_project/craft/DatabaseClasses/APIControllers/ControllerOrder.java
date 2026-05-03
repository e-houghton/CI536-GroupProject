package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceOrder;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class ControllerOrder extends ControllerParent<ServiceOrder, Order> {
    @Autowired
    ServiceOrder table;
    protected ServiceOrder getTable(){
        return table;
    }

    @PostMapping("/addProduct")
    public void addProd(@RequestBody Map<String,Integer> r){
        table.addProdToOrder(r.get("orderID"),r.get("productID"),r.get("quantOrdered"));
    }
}
