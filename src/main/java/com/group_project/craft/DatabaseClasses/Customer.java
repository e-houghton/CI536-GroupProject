package com.group_project.craft.DatabaseClasses;

import jakarta.persistence.*;

@NamedQuery(name="getAllFields", query=" select c from Customer c")
@Entity
@Table(name="tCust")
public class Customer {
    // ======================================
    // =             Attributes             =
    // ======================================


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, length = 50)
    private String fname;
    @Column(nullable = false, length = 50)
    private String lname;
    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false,length=50)
    private String phone;
    @Column(nullable = false,length=50)
    private String addrln1;
    @Column(length=50)
    private String addrln2;
    @Column(nullable = false,length=50)
    private String city;
    @Column(nullable = false,length=50)
    private String county;
    @Column(nullable = false,length=10)
    private String postcode;
    private boolean isGuest;







    // ======================================
    // =            Constructors            =
    // ======================================
    protected Customer(){}
    public Customer(String fname, String lname, String email, String phone, String addrln1, String addrln2, String city, String county, String postcode, boolean isGuest) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.addrln1 = addrln1;
        this.addrln2 = addrln2;
        this.city = city;
        this.county = county;
        this.postcode = postcode;
        this.isGuest = isGuest;
    }


    // ======================================
    // =           Getters+Setters          =
    // ======================================
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddrln1() {
        return addrln1;
    }

    public void setAddrln1(String addrln1) {
        this.addrln1 = addrln1;
    }

    public String getAddrln2() {
        return addrln2;
    }

    public void setAddrln2(String addrln2) {
        this.addrln2 = addrln2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public boolean isGuest() {
        return isGuest;
    }

    public void setGuest(boolean guest) {
        isGuest = guest;
    }
}
