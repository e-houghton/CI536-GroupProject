package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceWishlist;
import com.group_project.craft.DatabaseClasses.Repository.RepoWishlist;
import com.group_project.craft.DatabaseClasses.Tables.Order;
import com.group_project.craft.DatabaseClasses.Tables.User;
import com.group_project.craft.DatabaseClasses.Tables.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceWishlist implements InterfaceWishlist {
    @Autowired
    RepoWishlist repo;

    @Override
    public List<Wishlist> findAll() {
        return repo.findAll();
    }


    @Override
    public void save(Wishlist c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Wishlist> opt = repo.findById(id);
        opt.ifPresent(wishlist -> repo.save(wishlist));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Wishlist> opt = repo.findById(id);
        opt.ifPresent(wishlist -> repo.delete(wishlist));
    }


    @Override
    public Wishlist findByID(int id) {
        Optional<Wishlist> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Wishlist object) {
        repo.delete(object);
    }


    @Override
    public void addWishlist(User owner, String name) {
        repo.save(new Wishlist(owner,name));
    }

    @Override
    public void addByObj(Wishlist obj){
        repo.save(obj);
    }
    @Override
    public List<Wishlist> getAllByOwner(User owner) {
        return repo.findAllByOwner(owner);
    }
}