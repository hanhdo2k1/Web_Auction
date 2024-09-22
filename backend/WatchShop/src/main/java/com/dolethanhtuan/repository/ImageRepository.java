package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ImageRepository extends JpaRepository<Image,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Image i WHERE i.product_image.id = :idProduct")
    void deleteAllByProductId(@Param("idProduct") Long idProduct);
}
