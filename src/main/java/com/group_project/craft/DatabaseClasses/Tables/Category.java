package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tCategory")
public class Category {
    protected Category() {
    }

    public Category(String description, String name) {
        this.description = description;
        this.name = name;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int catID;

    @Column(length = 50)
    private String name;

    @Column(length = 100)
    private String description;

    @OneToMany(mappedBy="category",
            targetEntity= Subcategory.class,
            fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Subcategory> subcategories = new ArrayList<>();

    public List<Subcategory> getSubcategories() {
        return subcategories;
    }
    public void addSubcategory(Subcategory cat){
        this.subcategories.add(cat);
    }

    public void setSubcategories(List<Subcategory> subcategories) {
        this.subcategories = subcategories;
    }

    public int getCatID() {
        return catID;
    }

    public void setCatID(int catID) {
        this.catID = catID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
