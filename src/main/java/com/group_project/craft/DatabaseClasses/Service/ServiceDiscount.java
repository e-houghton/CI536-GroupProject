package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceDiscount;
import com.group_project.craft.DatabaseClasses.Repository.RepoDiscount;
import com.group_project.craft.DatabaseClasses.Tables.Discount;
import com.group_project.craft.DatabaseClasses.Tables.ReviewProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceDiscount implements InterfaceDiscount {
    @Autowired
    RepoDiscount repo;

    @Override
    public List<Discount> findAll() {
        return repo.findAll();
    }

    @Override
    public void addDiscount(String name, String description, int amount) {
        repo.save(new Discount(name, description, amount));
    }
    @Override
    public Discount addByObj(Discount obj){
        return repo.save(obj);
    }
    @Override
    public List<Discount> getAllByName(String name) {
        return repo.findAllByName(name);
    }



    @Override
    public void save(Discount c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Discount> opt = repo.findById(id);
        opt.ifPresent(discount -> repo.save(discount));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Discount> opt = repo.findById(id);
        opt.ifPresent(discount -> repo.delete(discount));
    }


    @Override
    public Discount findByID(int id) {
        Optional<Discount> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Discount object) {
        repo.delete(object);
    }
}