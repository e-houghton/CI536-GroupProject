package com.group_project.craft.DatabaseClasses.Interface;

import java.util.List;

public interface InterfaceParent<R> {

    /**
     * find all values in table
     * @return
     */
    List<R> findAll();

    /**
     * Returns Java object of record based on ID
     * @param id
     * @return java object representing table record
     */
    R findByID(int id);

    /**
     * Deletes a record from table. based on Java Object
     * @param object
     */
    void delete(R object);

    /**
     * deletes a record from table. Based on ID
     * @param id
     */
    void deleteByID(int id);

    /**
     * Saves data to table. Saves record by Java Object
     * @param object
     */
    void save(R object);

    /**
     * Saves data to table. Saves record by ID
     * @param id
     */
    void saveByID(int id);

    /**
     * Add new record to table, using Java Object.
     * @param object
     */
    R addByObj(R object);
}
