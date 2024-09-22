package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
