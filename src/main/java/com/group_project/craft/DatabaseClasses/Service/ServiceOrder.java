package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceOrder;
import com.group_project.craft.DatabaseClasses.Repository.RepoOrder;
import com.group_project.craft.DatabaseClasses.Repository.RepoProduct;
import com.group_project.craft.DatabaseClasses.Tables.*;
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
    @Autowired
    ServiceProduct prodService;
    @Autowired
    RepoProduct prodRepo;

    @Override
    public List<Order> findAll() {
        return repo.findAll();
    }

    @Override
    public void addOrder(Customer buyer, Date date) {
        repo.save(new Order(buyer, date));
    }

    @Override
    public Order addByObj(Order obj) {
        return repo.save(obj);
    }

    @Override
    public List<Order> getAllByBuyer(Customer buyer) {
        return repo.findAllByBuyer(buyer);
    }


    @Override
    public void save(Order c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
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
    public void addProdToOrder(int oID, int pID, int quantOrdered) {
        Order o = findByID(oID);
        Product p = prodService.findByID(pID);
        for(int i = 0; i<quantOrdered;i++) {

            o.addItem(new OrderLine(o, p));
            p.setQuant(p.getQuant() - 1);
            if (p.getQuant() <= 0) {
                p.setSold(true);
            }

        }
        repo.save(o);
        prodRepo.save(p);
    }

    @Override
    public void delete(Order object) {
        repo.delete(object);
    }
}