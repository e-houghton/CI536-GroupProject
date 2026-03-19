package com.group_project.craft.DatabaseClasses.Interface;

import java.util.List;

public interface InterfaceParent<R> {
    List<R> findAll();
    R findByID(int id);
    void delete(R object);
    void deleteByID(int id);
    void update(R object);
    void updateByID(int id);
}
