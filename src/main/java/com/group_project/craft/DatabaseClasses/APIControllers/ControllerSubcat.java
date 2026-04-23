package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Service.ServiceCategory;
import com.group_project.craft.DatabaseClasses.Service.ServiceReviewSeller;
import com.group_project.craft.DatabaseClasses.Service.ServiceSubcat;
import com.group_project.craft.DatabaseClasses.Tables.ReviewSeller;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import jakarta.persistence.AssociationOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subcat")
public class ControllerSubcat extends ControllerParent<ServiceSubcat, Subcategory> {
    @Autowired
    ServiceSubcat table;
    ServiceCategory catTable;
    protected ServiceSubcat getTable(){
        return table;
    }

    /*@PostMapping("/add")
    public Subcategory create(@RequestBody String description, ){
        return getTable().addSubcat();
    }*/

}
