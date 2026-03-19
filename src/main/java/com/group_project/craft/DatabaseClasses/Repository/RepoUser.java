package com.group_project.craft.DatabaseClasses.Repository;

import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Exists as a "list of queries" of sorts. findAll overrides a default select * from.
 * more info: <a href="https://medium.com/@bolot.89/spring-data-jpa-repository-0e6ea3051ff0">...</a>
 */
@Repository
public interface RepoUser extends JpaRepository<User, Integer> {
    User findByUsername(String username);

}
