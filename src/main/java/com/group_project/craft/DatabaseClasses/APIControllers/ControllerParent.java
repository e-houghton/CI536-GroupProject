package com.group_project.craft.DatabaseClasses.APIControllers;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceParent;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

public abstract class ControllerParent<Service extends InterfaceParent<T>,T> {
    Service table;
    protected Service getTable(){
        return table;
    }
    @GetMapping("/find/{id}")
    public T read(@PathVariable int id){
        return getTable().findByID(id);
    }
    @GetMapping("/findAll")
    public List<T> getAll(){
        return getTable().findAll();
    }

    @PostMapping("/add")
    public T create(@RequestBody T customer){
        return getTable().addByObj(customer);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id){
        getTable().deleteByID(id);
    }
    @PutMapping("/update")
    public void update(@RequestBody T cust){
        getTable().save(cust);
    }
}
