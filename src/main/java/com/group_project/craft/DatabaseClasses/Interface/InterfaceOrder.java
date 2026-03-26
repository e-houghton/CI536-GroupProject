package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.Order;

import java.util.Date;
import java.util.List;

public interface InterfaceOrder extends InterfaceParent<Order> {
    void addOrder(Customer buyer, Date purchaseDate);
    List<Order> getAllByBuyer(Customer buyer);
}
