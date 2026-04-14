package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Exists as a "list of queries" of sorts. findAll overrides a default select * from.
 * more info: <a href="https://medium.com/@bolot.89/spring-data-jpa-repository-0e6ea3051ff0">...</a>
 */
@Repository
public interface RepoProduct extends JpaRepository<Product, Integer> {
    ArrayList<Product> findAllBySeller(User seller);
    ArrayList<Product> findAllBySubcategory(Subcategory subcategory);
    ArrayList<Product> findAllByNameContaining(String searchTerm);
    ArrayList<Product> findAllByDescriptionContaining(String searchTerm);
}
