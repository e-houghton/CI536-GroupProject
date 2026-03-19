package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceOrder;
import com.group_project.craft.DatabaseClasses.Repository.RepoOrder;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceOrder implements InterfaceOrder {
    @Autowired
    RepoOrder repo;

    @Override
    public List<Order> findAll() {
        return repo.findAll();
    }

    @Override
    public void addOrder(Customer buyer, Date date) {
        repo.save(new Order(buyer, date));
    }

    @Override
    public List<Order> getAllByBuyer(Customer buyer) {
        return repo.findAllByBuyer(buyer);
    }


    @Override
    public void update(Order c) {
        repo.save(c);
    }

    @Override
    public void updateByID(int id) {
        Optional<Order> opt = repo.findById(id);
        opt.ifPresent(order -> repo.save(order));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Order> opt = repo.findById(id);
        opt.ifPresent(order -> repo.delete(order));
    }


    @Override
    public Order findByID(int id) {
        Optional<Order> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Order object) {
        repo.delete(object);
    }
}