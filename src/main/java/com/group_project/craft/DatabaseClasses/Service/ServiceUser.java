package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceUser;
import com.group_project.craft.DatabaseClasses.Repository.RepoUser;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceUser implements InterfaceUser {
    @Autowired
    RepoUser repo;

    @Override
    public List<User> findAll() {
        return repo.findAll();
    }


    @Override
    public void update(User c) {
        repo.save(c);
    }

    @Override
    public void updateByID(int id) {
        Optional<User> opt = repo.findById(id);
        opt.ifPresent(user -> repo.save(user));
    }

    @Override
    public void deleteByID(int id) {
        Optional<User> opt = repo.findById(id);
        opt.ifPresent(user -> repo.delete(user));
    }


    @Override
    public User findByID(int id) {
        Optional<User> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(User object) {
        repo.delete(object);
    }


    @Override
    public void addUser(String username, String password, Customer customer) {
        repo.save(new User(username,password,customer));
    }

    @Override
    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }
}