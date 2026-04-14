package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public interface InterfaceProduct extends InterfaceParent<Product> {
    void addProduct(String name, String description, Date uploadDate, User seller, String imageLocation, double price, Subcategory subcategory, boolean sold);

    List<Product> getAllBySeller(User seller);

    List<Product> getAllBySubcat(Subcategory subcat);


    ArrayList<Product> fuzzySearch(String searchTerm);
}
