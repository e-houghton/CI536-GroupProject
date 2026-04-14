package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceProduct;
import com.group_project.craft.DatabaseClasses.Repository.RepoProduct;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceProduct implements InterfaceProduct {
    @Autowired
    RepoProduct repo;

    @Override
    public List<Product> findAll() {
        return repo.findAll();
    }

    @Override
    public void addProduct(String name, String description, Date uploadDate, User seller, String imageLocation, double price, Subcategory subcategory, boolean sold) {
        repo.save(new Product(name,description,uploadDate,seller,imageLocation,price,subcategory,sold));
    }
    @Override
    public void addByObj(Product obj){
        repo.save(obj);
    }
    @Override
    public List<Product> getAllBySeller(User seller) {
        return repo.findAllBySeller(seller);
    }

    @Override
    public List<Product> getAllBySubcat(Subcategory subcat) {
        return repo.findAllBySubcategory(subcat);
    }


    @Override
    public void save(Product c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Product> opt = repo.findById(id);
        opt.ifPresent(product -> repo.save(product));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Product> opt = repo.findById(id);
        opt.ifPresent(product -> repo.delete(product));
    }


    @Override
    public Product findByID(int id) {
        Optional<Product> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Product object) {
        repo.delete(object);
    }

    @Override
    public ArrayList<Product> fuzzySearch(String searchTerm){
        ArrayList<Product> output = repo.findAllByNameContaining(searchTerm);
        output.addAll(repo.findAllByDescriptionContaining(searchTerm));
        return output;
    }
}