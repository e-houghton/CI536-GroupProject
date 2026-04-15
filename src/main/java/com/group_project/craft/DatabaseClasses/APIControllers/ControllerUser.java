package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceSubcat;
import com.group_project.craft.DatabaseClasses.Service.ServiceUser;
import com.group_project.craft.DatabaseClasses.Tables.Category;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

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

    @GetMapping("/existsByUsername/{username}")
    public boolean existsByUsername(@PathVariable String username) {
        return table.existsByUsername(username);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> request){
        String email = request.get("email");
        String password = request.get("password");
        User user = table.login(email, password);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(user);
    }
}
