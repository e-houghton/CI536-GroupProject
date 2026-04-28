package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceUser;
import com.group_project.craft.DatabaseClasses.Service.ServiceWishlist;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.User;
import com.group_project.craft.DatabaseClasses.Tables.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class ControllerWishlist extends ControllerParent<ServiceWishlist, Wishlist> {
    @Autowired
    ServiceWishlist table;
    @Autowired
    ServiceUser userTable;
    protected ServiceWishlist getTable(){
        return table;
    }


    @PostMapping("/addProduct")
    public void addProd(@RequestParam int wID, @RequestPart Product p){
        table.addProdToWishlist(wID,p);
    }
    @GetMapping("/findAllByID/{id}")
    public List<Wishlist> findByID(@PathVariable int id){
        return table.getAllByOwner(userTable.findByID(id));
    }



}
