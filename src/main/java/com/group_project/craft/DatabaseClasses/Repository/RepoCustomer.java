package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Exists as a "list of queries" of sorts. findAll overrides a default select * from.
 * more info: <a href="https://medium.com/@bolot.89/spring-data-jpa-repository-0e6ea3051ff0">...</a>
 * <a href="https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html">...</a>
 */
@Repository
public interface RepoCustomer extends JpaRepository<Customer, Integer> {
}
