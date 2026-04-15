package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceCategory;
import com.group_project.craft.DatabaseClasses.Repository.RepoCategory;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceCategory implements InterfaceCategory {
    @Autowired
    RepoCategory repo;

    @Override
    public List<Category> findAll() {
        return repo.findAll();
    }

    @Override
    public void addCategory(String description, String name) {
        repo.save(new Category(description, name));
    }

    @Override
    public Category addByObj(Category obj) {
        return repo.save(obj);
    }

    @Override
    public List<Category> getAllByName(String name) {
        return repo.findAllByName(name);
    }

    @Override
    public void save(Category c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Category> opt = repo.findById(id);
        opt.ifPresent(category -> repo.save(category));
    }

    @Override
    public void delete(Category record) {
        repo.delete(record);
    }

    @Override
    public void deleteByID(int id) {
        Optional<Category> opt = repo.findById(id);
        opt.ifPresent(category -> repo.delete(category));
    }


    @Override
    public Category findByID(int id) {
        Optional<Category> opt = repo.findById(id);
        return opt.orElse(null);
    }




}
