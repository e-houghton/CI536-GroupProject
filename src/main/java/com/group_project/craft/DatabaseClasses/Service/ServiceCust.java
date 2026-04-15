package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceCust;
import com.group_project.craft.DatabaseClasses.Repository.RepoCustomer;
import com.group_project.craft.DatabaseClasses.Tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceCust implements InterfaceCust {
    @Autowired
    RepoCustomer repoCustomer;

    @Override
    public List<Customer> findAll() {
        return repoCustomer.findAll();
    }

    @Override
    public void addCustomer(String fname, String lname, String email, String phone, String addrln1, String addrln2, String city, String county, String country, String postcode) {
        repoCustomer.save(new Customer(fname, lname, email, phone, addrln1, addrln2, city, county,country, postcode, true));
    }
    @Override
    public Customer addByObj(Customer cust){
        return repoCustomer.save(cust);
    }

    @Override
    public void save(Customer c) {
        repoCustomer.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Customer> opt = repoCustomer.findById(id);
        opt.ifPresent(customer -> repoCustomer.save(customer));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Customer> opt = repoCustomer.findById(id);
        opt.ifPresent(customer -> repoCustomer.delete(customer));
    }


    @Override
    public Customer findByID(int id) {
        Optional<Customer> opt = repoCustomer.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Customer customer) {
        repoCustomer.delete(customer);
    }

    @Override 
    public boolean existsByEmail(String email) {
        return repoCustomer.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) { return repoCustomer.existsByPhone(phone); }
}