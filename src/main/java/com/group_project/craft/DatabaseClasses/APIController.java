package com.group_project.craft.DatabaseClasses;
import java.util.ArrayList;

import com.group_project.craft.DatabaseClasses.Service.CustService;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * API Controller. experimental code taken from https://www.geeksforgeeks.org/java/spring-boot-spring-data-jpa/
 */
@RestController
public class APIController {

    @Autowired
    CustService customerServiceImp;

    @GetMapping("/dbTestAdd")
    public String add() {
        customerServiceImp.addCustomer();
        return "Added Customer!";
    }

    @GetMapping("/findall")
    public ArrayList<Customer> getAllEmployee() {
        return customerServiceImp.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public Customer getEmployeeUsingId(@PathVariable long id) {
        return customerServiceImp.findAllCustByID(id);
    }

    @DeleteMapping("/delete")
    public void delete() {
        customerServiceImp.deleteAllData();
    }
}