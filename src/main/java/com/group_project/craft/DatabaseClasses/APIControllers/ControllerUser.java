package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceSubcat;
import com.group_project.craft.DatabaseClasses.Service.ServiceUser;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/user")
public class ControllerUser extends ControllerParent<ServiceUser, User> {
    @Autowired
    ServiceUser table;
    protected ServiceUser getTable(){
        return table;
    }

    @GetMapping("/fuzzySearch/{searchTerm}")
    ArrayList<User> fuzzySearch(@PathVariable String searchTerm){
        return table.fuzzySearch(searchTerm);
    }


}
