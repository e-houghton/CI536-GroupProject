package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceSubcat;
import com.group_project.craft.DatabaseClasses.Repository.RepoSubcat;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceSubcat implements InterfaceSubcat {
    @Autowired
    RepoSubcat repo;

    @Override
    public List<Subcategory> findAll() {
        return repo.findAll();
    }


    @Override
    public void save(Subcategory c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Subcategory> opt = repo.findById(id);
        opt.ifPresent(subcategory -> repo.save(subcategory));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Subcategory> opt = repo.findById(id);
        opt.ifPresent(subcategory -> repo.delete(subcategory));
    }


    @Override
    public Subcategory findByID(int id) {
        Optional<Subcategory> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Subcategory object) {
        repo.delete(object);
    }

    @Override
    public void addSubcat(String description, String name, Category category) {
        repo.save(new Subcategory(name,description,category));
    }
    @Override
    public void addByObj(Subcategory obj){
        repo.save(obj);
    }
    @Override
    public List<Subcategory> getAllByName(String name) {
        return repo.findAllByName(name);
    }
}