package com.group_project.craft.DatabaseClasses.Interface;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.User;

import java.util.ArrayList;

/**
 * Acts as a list of methods in class that implements this.
 */
public interface InterfaceUser extends InterfaceParent<User>{
    void addUser(String username, String password, Customer customer);
    User findByUsername(String username);
    User login(String email,String password);
    boolean  existsByUsername(String username);

    ArrayList<User> fuzzySearch(String searchTerm);
}
