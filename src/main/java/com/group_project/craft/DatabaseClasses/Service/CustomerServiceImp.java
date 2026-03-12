package com.group_project.craft.DatabaseClasses.Service;

import java.util.ArrayList;
import java.util.Optional;

import com.group_project.craft.DatabaseClasses.*;
import com.group_project.craft.DatabaseClasses.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class CustomerServiceImp implements CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    @Override
    public ArrayList<Customer> findAll() {
        return customerRepo.findAll();
    }

    @Override
    public Customer findAllEmployeeByID(long id) {
        Optional<Customer> opt = customerRepo.findById(id);
        if (opt.isPresent())
            return opt.get();
        else
            return null;
    }

    @Override
    public void addCustomer() {
        ArrayList<Customer> emp = new ArrayList<>();
        emp.add(new Customer("ez",
                "houghton",
                "e.houghton4@uni.brighton.ac.uk",
                "07777777777",
                "test1",
                null,
                "testcity",
                "testcounty",
                "TE57 9AA",
                false));
        for (Customer employee : emp) {
            customerRepo.save(employee);
        }
    }

    @Override
    public void deleteAllData() {
        customerRepo.deleteAll();
    }
}