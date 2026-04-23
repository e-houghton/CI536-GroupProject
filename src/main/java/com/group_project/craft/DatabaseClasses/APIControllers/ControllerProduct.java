package com.group_project.craft.DatabaseClasses.APIControllers;
import com.group_project.craft.DatabaseClasses.Service.ServiceProduct;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ControllerProduct extends ControllerParent<ServiceProduct, Product> {
    @Autowired
    ServiceProduct table;
    protected ServiceProduct getTable(){
        return table;
    }

    @GetMapping("/fuzzySearch/{searchTerm}")
    ArrayList<Product> fuzzySearch(@PathVariable String searchTerm){
        return table.fuzzySearch(searchTerm);
    }

    @PostMapping(path = "/test",consumes = {"multipart/form-data"})
    void test(@RequestPart("file") MultipartFile[] file, @RequestPart("body") Product p){
        table.createImage(file,p);
    }
}
