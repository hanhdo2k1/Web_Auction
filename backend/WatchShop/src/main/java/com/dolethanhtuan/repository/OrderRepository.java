package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
