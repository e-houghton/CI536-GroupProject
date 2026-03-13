package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.Customer;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * Exists as a "list of queries" of sorts. findAll overrides a default select * from.
 * more info: https://medium.com/@bolot.89/spring-data-jpa-repository-0e6ea3051ff0
 */
@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    ArrayList<User> findAll();

}
