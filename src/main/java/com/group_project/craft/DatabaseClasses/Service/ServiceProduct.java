package com.group_project.craft.DatabaseClasses.Service;

import com.group_project.craft.DatabaseClasses.Interface.InterfaceProduct;
import com.group_project.craft.DatabaseClasses.Repository.RepoProduct;
import com.group_project.craft.DatabaseClasses.Tables.Product;
import com.group_project.craft.DatabaseClasses.Tables.Subcategory;
import com.group_project.craft.DatabaseClasses.Tables.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


//  @Service marks a Java class that performs some service,
//  such as executing business logic, performing
//  calculations, and calling external APIs.
@Service
public class ServiceProduct implements InterfaceProduct {
    @Autowired
    RepoProduct repo;

    @Override
    public List<Product> findAll() {
        return repo.findAll();
    }

    @Override
    public void addProduct(String name, String description, Date uploadDate, User seller, String imageLocation, double price, Subcategory subcategory, boolean sold) {
        repo.save(new Product(name, description, uploadDate, seller, imageLocation, price, subcategory, sold));
    }

    @Override
    public Product addByObj(Product obj) {
        return repo.save(obj);
    }

    @Override
    public List<Product> getAllBySeller(User seller) {
        return repo.findAllBySeller(seller);
    }

    @Override
    public List<Product> getAllBySubcat(Subcategory subcat) {
        return repo.findAllBySubcategory(subcat);
    }


    @Override
    public void save(Product c) {
        repo.save(c);
    }

    @Override
    public void saveByID(int id) {
        Optional<Product> opt = repo.findById(id);
        opt.ifPresent(product -> repo.save(product));
    }

    @Override
    public void deleteByID(int id) {
        Optional<Product> opt = repo.findById(id);
        opt.ifPresent(product -> repo.delete(product));
    }


    @Override
    public Product findByID(int id) {
        Optional<Product> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void delete(Product object) {
        repo.delete(object);
    }

    @Override
    public ArrayList<Product> fuzzySearch(String searchTerm) {
        ArrayList<Product> output = repo.findAllByNameContaining(searchTerm);
        output.addAll(repo.findAllByDescriptionContaining(searchTerm));
        return output;
    }

    public void createImage(MultipartFile[] files, Product p) {
        System.out.println(p);
        p = addByObj(p);
        p.setImageLocation(String.format("%d/%d", p.getSeller().getUserID(), p.getProdID()));
        File mediaDir = new File(System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "media" + File.separator + "productImages");
        File userDir = new File(mediaDir, String.valueOf(p.getSeller().getUserID()));
        File productDir = new File(userDir, String.valueOf(p.getProdID()));
        Path productPath = Paths.get(productDir.toString());
        if (!productDir.exists()) {
            productDir.mkdirs();
        }
        for (int i = 0; i < files.length; i++) {
            String fileName = String.format("%d.png", i);
            Path filePath = productPath.resolve(fileName);
            System.out.println(filePath.toString());
            try {
                Files.copy(files[i].getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("copied??");
                save(p);

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}