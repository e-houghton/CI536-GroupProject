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
    @JoinColumn(name="category")
    private Category category;

    protected Subcategory() {
    }

    public Subcategory(String name, String description, Category category) {
        this.name = name;
        this.description = description;
        this.category = category;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
