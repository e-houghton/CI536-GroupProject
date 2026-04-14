package com.group_project.craft.DatabaseClasses.Tables;

import jakarta.persistence.*;

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
