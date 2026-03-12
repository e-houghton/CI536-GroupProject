package com.group_project.craft.DatabaseClasses.Service;
import com.group_project.craft.DatabaseClasses.Customer;

import java.util.ArrayList;
public interface CustomerService {
    ArrayList<Customer> findAll();
    Customer findAllEmployeeByID(long id);
    void addCustomer();
    void deleteAllData();
}
