package com.group_project.craft.DatabaseClasses.Interface;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.User;

/**
 * Acts as a list of methods in class that implements this.
 */
public interface InterfaceUser extends InterfaceParent<User>{
    void addUser(String username, String password, Customer customer);
    User findByUsername(String username);

}
