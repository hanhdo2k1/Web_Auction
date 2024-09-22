package com.dolethanhtuan.api;

import com.dolethanhtuan.entity.Category;
import com.dolethanhtuan.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryAPI {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryRepository.findAll();
    }

    @PostMapping("/save")
    public Category save(@RequestBody Category category){
        category.setId(null);
        return categoryRepository.save(category);
    }

    @PutMapping("/update")
    public Category update(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        categoryRepository.deleteById(id);
    }
    @GetMapping("/count")
    public long countCategory(){
        return categoryRepository.findAll().size();
    }
}
