package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceCust;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class ControllerCustomer extends ControllerParent<ServiceCust,Customer> {
    @Autowired
    ServiceCust table;
    protected ServiceCust getTable(){
        return table;
    }

    @GetMapping("/existsByEmail/{email}")
    public Boolean existsByEmail(@PathVariable String email) {
        return table.existsByEmail(email);
    }

    @GetMapping("/existsByPhone/{phone}")
    public Boolean existsByPhone(@PathVariable String phone) {
        return table.existsByPhone(phone);
    }

}
