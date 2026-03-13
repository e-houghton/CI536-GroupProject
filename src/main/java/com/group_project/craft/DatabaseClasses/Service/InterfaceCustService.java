package com.group_project.craft.DatabaseClasses.Service;
import com.group_project.craft.DatabaseClasses.Tables.Customer;

import java.util.ArrayList;

/**
 * Acts as a list of methods in class that implements this.
 */
public interface InterfaceCustService {
    ArrayList<Customer> findAll();
    Customer findAllCustByID(long id);
    void addCustomer();
    void deleteAllData();
}
