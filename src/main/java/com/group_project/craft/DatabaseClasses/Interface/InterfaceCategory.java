package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Product;

import java.util.ArrayList;
import java.util.List;


public interface InterfaceCategory extends InterfaceParent<Category> {
    void addCategory(String description, String name);
    List<Category> getAllByName(String name);
}
