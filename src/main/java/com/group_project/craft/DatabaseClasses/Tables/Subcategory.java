package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

@Entity
@Table(name="tSubCategory")
public class Subcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int subcatID;

    @Column(nullable = false,length=50)
    private String name;

    @Column(nullable = false,length=100)
    private String description;

    @ManyToOne
    @PrimaryKeyJoinColumn
    private Category catID;

    protected Subcategory() {
    }

    public Subcategory(int subcatID, String name, String description, Category catID) {
        this.subcatID = subcatID;
        this.name = name;
        this.description = description;
        this.catID = catID;
    }

    public int getSubcatID() {
        return subcatID;
    }

    public void setSubcatID(int subcatID) {
        this.subcatID = subcatID;
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

    public Category getCatID() {
        return catID;
    }

    public void setCatID(Category catID) {
        this.catID = catID;
    }
}
