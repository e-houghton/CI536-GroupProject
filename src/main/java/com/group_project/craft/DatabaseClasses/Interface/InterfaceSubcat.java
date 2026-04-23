package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;

import java.util.List;

public interface InterfaceSubcat extends InterfaceParent<Subcategory> {
    Subcategory addSubcat(String description, String name, Category category);
    List<Subcategory> getAllByName(String name);

}
