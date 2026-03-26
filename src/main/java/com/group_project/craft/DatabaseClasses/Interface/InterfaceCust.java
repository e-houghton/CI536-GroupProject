package com.group_project.craft.DatabaseClasses.Interface;
import com.group_project.craft.DatabaseClasses.Tables.Customer;

/**
 * Acts as a list of methods in class that implements this.
 */
public interface InterfaceCust extends InterfaceParent<Customer>{
    void addCustomer(String fname, String lname, String email, String phone, String addrln1, String addrln2, String city, String county, String postcode);


}
