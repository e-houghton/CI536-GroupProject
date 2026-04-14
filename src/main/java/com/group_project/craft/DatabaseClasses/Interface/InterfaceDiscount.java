package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.Discount;

import java.util.List;

public interface InterfaceDiscount extends InterfaceParent<Discount> {
    void addDiscount(String name, String description,int amount);
    List<Discount> getAllByName(String name);

}
