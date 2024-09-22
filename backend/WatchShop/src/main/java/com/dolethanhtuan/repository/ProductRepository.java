package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>, PagingAndSortingRepository<Product,Long> {
    Product findOneByIdAndStatus(Long id,int status);
    @Modifying
    @Query(value = "UPDATE product SET status = 0 WHERE DATE_ADD(start_date, INTERVAL 24*3 HOUR) <= NOW() AND status = 1", nativeQuery = true)
    void updateExpiredProducts();
    @Query(value = "SELECT * FROM product WHERE DATE_ADD(start_date, INTERVAL 24*3 HOUR) <= NOW() AND status = 1", nativeQuery = true)
    List<Product> findExpiredProductIds();
}
