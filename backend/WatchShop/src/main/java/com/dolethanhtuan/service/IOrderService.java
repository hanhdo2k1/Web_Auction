package com.dolethanhtuan.service;

import com.dolethanhtuan.dto.OrderDTO;
import com.dolethanhtuan.entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IOrderService extends IGenericService<OrderDTO> {
    OrderDTO save(OrderDTO userDTO,String username);
    OrderDTO findOneById(Long idOrder);
    List<OrderDTO> findAllByUsername(String username);
    List<OrderDTO> findAll();
    void updateStatus(Long orderId);
}
