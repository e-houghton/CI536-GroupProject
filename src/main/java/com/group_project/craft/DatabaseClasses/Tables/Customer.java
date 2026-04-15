package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name="tCust")
public class Customer {
    // ======================================
    // =             Attributes             =
    // ======================================


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int custID;
    @Column(nullable = false, length = 50)
    private String fname;
    @Column(nullable = false, length = 50)
    private String lname;
    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false,length=50)
    private String phone;
    @Column(nullable = false,length=50)
    private String addrLine1;
    @Column(length=50)
    private String addrLine2;
    @Column(nullable = false,length=50)
    private String addrCity;
    @Column(nullable = false,length=50)
    private String addrCounty;
    @Column(nullable = false,length=10)
    private String addrPostCode;
    @Column(columnDefinition = "varchar(100) default 'England'")
    private String addrCountry="England";

    public String getAddrCountry() {
        return addrCountry;
    }

    public void setAddrCountry(String addrCountry) {
        this.addrCountry = addrCountry;
    }


    @Column(nullable = false, name = "guest")
    private boolean guest = false;







    // ======================================
    // =            Constructors            =
    // ======================================
    protected Customer(){}
    public Customer(String fname, String lname, String email, String phone, String addrln1, String addrln2, String city, String county, String postcode,String country, boolean guest) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.addrLine1 = addrln1;
        this.addrLine2 = addrln2;
        this.addrCity = city;
        this.addrCounty = county;
        this.addrPostCode = postcode;
        this.addrCountry = country;
        this.guest = guest;
    }


    // ======================================
    // =           Getters+Setters          =
    // ======================================
    public int getCustID() {
        return custID;
    }

    public void setCustID(int custID) {
        this.custID = custID;
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

    public String getAddrLine1() {
        return addrLine1;
    }

    public void setAddrLine1(String addrLine1) {
        this.addrLine1 = addrLine1;
    }

    public String getAddrLine2() {
        return addrLine2;
    }

    public void setAddrLine2(String addrLine2) {
        this.addrLine2 = addrLine2;
    }

    public String getAddrCity() {
        return addrCity;
    }

    public void setAddrCity(String addrCity) {
        this.addrCity = addrCity;
    }

    public String getAddrCounty() {
        return addrCounty;
    }

    public void setAddrCounty(String addrCounty) {
        this.addrCounty = addrCounty;
    }

    public String getAddrPostCode() {
        return addrPostCode;
    }

    public void setAddrPostCode(String addrPostCode) {
        this.addrPostCode = addrPostCode;
    }

    public boolean isGuest() {
        return guest;
    }

    public void setGuest(boolean guest) {
        this.guest = guest;
    }
}

