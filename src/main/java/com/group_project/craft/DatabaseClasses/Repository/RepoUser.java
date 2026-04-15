package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * Exists as a "list of queries" of sorts. findAll overrides a default select * from.
 * more info: <a href="https://medium.com/@bolot.89/spring-data-jpa-repository-0e6ea3051ff0">...</a>
 */
@Repository
public interface RepoUser extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    /*To check if a username is already being used when a user is creating an account */
    boolean existsByUsername(String username);
    ArrayList<User> findAllByUsernameContaining(String searchTerm);
    /* Finds a user's password and email for the login validation */
    User findByUsernameAndPassword(String username, String password);
    User findByCustomerEmail(String email);
}
