package com.group_project.craft.DatabaseClasses.Interface;

import com.group_project.craft.DatabaseClasses.Tables.User;
import com.group_project.craft.DatabaseClasses.Tables.Wishlist;

import java.util.List;

public interface InterfaceWishlist extends InterfaceParent<Wishlist> {
    void addWishlist(User owner, String name);
    List<Wishlist> getAllByOwner(User owner);
}
