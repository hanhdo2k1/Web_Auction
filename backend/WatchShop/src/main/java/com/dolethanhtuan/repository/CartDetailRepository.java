package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.CartDetail;
import com.dolethanhtuan.entity.embeddedID.CartDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CartDetailRepository extends JpaRepository<CartDetail, CartDetailId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CartDetail cd WHERE cd.cartDetailId.cartId = :idCart")
    void deleteAllByCartId(@Param("idCart") Long idCart);
}
