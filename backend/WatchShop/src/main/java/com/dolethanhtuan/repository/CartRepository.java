package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart findCartByUserUserId(Long user_id);
}
