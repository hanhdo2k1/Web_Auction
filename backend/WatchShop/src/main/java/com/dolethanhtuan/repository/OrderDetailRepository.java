package com.dolethanhtuan.repository;

import com.dolethanhtuan.entity.OrderDetail;
import com.dolethanhtuan.entity.embeddedID.OrderDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailId> {

}
