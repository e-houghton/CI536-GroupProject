package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceUser;
import com.group_project.craft.DatabaseClasses.Service.ServiceWishlist;
import com.group_project.craft.DatabaseClasses.Tables.User;
import com.group_project.craft.DatabaseClasses.Tables.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/wishlist")
public class ControllerWishlist extends ControllerParent<ServiceWishlist, Wishlist> {
    @Autowired
    ServiceWishlist table;
    protected ServiceWishlist getTable(){
        return table;
    }


}
