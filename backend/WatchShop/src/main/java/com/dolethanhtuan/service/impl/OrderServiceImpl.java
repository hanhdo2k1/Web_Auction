package com.dolethanhtuan.service.impl;

import com.dolethanhtuan.dto.OrderDTO;
import com.dolethanhtuan.dto.OrderDetailDTO;
import com.dolethanhtuan.entity.*;
import com.dolethanhtuan.entity.embeddedID.OrderDetailId;
import com.dolethanhtuan.repository.*;
import com.dolethanhtuan.service.ICartService;
import com.dolethanhtuan.service.IOrderService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private CartServiceImpl cartService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public OrderDTO save(OrderDTO orderDTO) {
        return null;
    }

    @Override
    public void delete(Long[] ids) {

    }

    @Override
    public OrderDTO update(OrderDTO orderDTO) {
        return null;
    }

    @Override
    public List<OrderDTO> getAll() {
        return null;
    }

    @Override
    public OrderDTO getById(Long id) {
        return null;
    }

//    @Override
//    public OrderDTO save(OrderDTO orderDTO, String username) {
//        Order order = modelMapper.map(orderDTO,Order.class);
//        order.setOrderId(null);
//        User user = userRepository.findOneByUsername(username).orElse(null);
//        if(user == null) return null;
//        order.setUser(user);
//        order.setTotalPrice(user.getCart().getTotalPrice()+300000+user.getCart().getTotalPrice()*0.1);
//        order.setOrderDate(new Date());
//        order.setStatus(0);
//        order = orderRepository.save(order);
//        Set<OrderDetail> orderDetails = new HashSet<>();
//        for (CartDetail cartDetail: user.getCart().getCartDetails()) {
//            OrderDetail orderDetail = new OrderDetail(new OrderDetailId(order.getOrderId(),cartDetail.getProduct().getId()), cartDetail.getPrice(),order,cartDetail.getProduct());
//            orderDetailRepository.save(orderDetail);
//            orderDetails.add(orderDetail);
//        }
//        order.setOrderDetails(orderDetails);
//
//        orderDTO = modelMapper.map(order,OrderDTO.class);
//        Set<OrderDetailDTO> orderDetailDTOS = new HashSet<>();
//        for (var i: order.getOrderDetails()){
//            orderDetailDTOS.add(modelMapper.map(i,OrderDetailDTO.class));
//        }
//        orderDTO.setSetOrders(orderDetailDTOS);
//        // Reset cart
//        Long cartId = user.getCart().getCartId();
//        cartService.resetCartById(cartId);
//
//        return orderDTO;
//    }
@Transactional
@Override
public OrderDTO save(OrderDTO orderDTO, String username) {
    orderDTO.setStatus(0);
    Order order = modelMapper.map(orderDTO, Order.class);
    order.setOrderId(null);
    User user = userRepository.findOneByUsername(username).orElse(null);
    if (user == null) return null;
    order.setUser(user);
    order.setTotalPrice(user.getCart().getTotalPrice() + 300000 + user.getCart().getTotalPrice() * 0.1);
    order.setOrderDate(new Date());
    order.setStatus(0);

    // Sử dụng merge để hợp nhất thực thể detached
    order = orderRepository.saveAndFlush(order);

    Set<OrderDetail> orderDetails = new HashSet<>();
    for (CartDetail cartDetail : user.getCart().getCartDetails()) {
        OrderDetailId orderDetailId = new OrderDetailId(order.getOrderId(), cartDetail.getProduct().getId());

        // Kiểm tra nếu OrderDetail đã tồn tại trong session
        OrderDetail existingOrderDetail = orderDetailRepository.findById(orderDetailId).orElse(null);
        if (existingOrderDetail != null) {
            entityManager.detach(existingOrderDetail);
        }

        OrderDetail orderDetail = new OrderDetail(orderDetailId, cartDetail.getPrice(), order, cartDetail.getProduct());
        orderDetail = orderDetailRepository.saveAndFlush(orderDetail); // Sử dụng saveAndFlush thay vì save
        orderDetails.add(orderDetail);
    }
    order.setOrderDetails(orderDetails);

    orderDTO = modelMapper.map(order, OrderDTO.class);
    Set<OrderDetailDTO> orderDetailDTOS = new HashSet<>();
    for (var i : order.getOrderDetails()) {
        orderDetailDTOS.add(modelMapper.map(i, OrderDetailDTO.class));
    }
    orderDTO.setSetOrders(orderDetailDTOS);

    // Reset cart
    Long cartId = user.getCart().getCartId();
    cartService.resetCartById(cartId);

    return orderDTO;
}




    @Override
    public OrderDTO findOneById(Long idOrder) {
        Order order = orderRepository.findById(idOrder).orElse(null);
        if(order == null) return null;
        OrderDTO orderDTO = modelMapper.map(order,OrderDTO.class);
        Set<OrderDetailDTO> orderDetailDTOS = new HashSet<>();
        for (var i: order.getOrderDetails()){
            orderDetailDTOS.add(modelMapper.map(i,OrderDetailDTO.class));
        }
        orderDTO.setSetOrders(orderDetailDTOS);
        return orderDTO;
    }

    @Override
    public List<OrderDTO> findAllByUsername(String username) {
        User user = userRepository.findOneByUsername(username).orElse(null);
        List<OrderDTO> orderDTOs = new ArrayList<>();
        if(user == null) return null;
        for (var order: user.getOrders()) {
            orderDTOs.add(modelMapper.map(order,OrderDTO.class));
        }
        return orderDTOs;
    }

    @Override
    public List<OrderDTO> findAll() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOS = new ArrayList<>();
        for (var order:orders) {
            orderDTOS.add(modelMapper.map(order, OrderDTO.class));
        }
        return orderDTOS;
    }

    @Override
    public void updateStatus(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if(order == null) return;
        if(order.getStatus() < 3){
            order.setStatus(order.getStatus()+1);
            orderRepository.save(order);
        }
    }
}
