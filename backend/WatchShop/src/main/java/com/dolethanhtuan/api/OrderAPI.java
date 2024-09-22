package com.dolethanhtuan.api;

import com.dolethanhtuan.dto.OrderDTO;
import com.dolethanhtuan.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order/")
public class OrderAPI {
    @Autowired
    private IOrderService orderService;

    @PostMapping("add")
    public OrderDTO order(@RequestBody OrderDTO orderDTO){
        OrderDTO rs = orderService.save(orderDTO, orderDTO.getUsername());
        rs.setHttpStatus(200);
        return rs;
    }
    @GetMapping("detail/{id}")
    public OrderDTO orderById(@PathVariable("id") Long idOrder){
        OrderDTO rs = orderService.findOneById(idOrder);
        return rs;
    }
    @GetMapping("/user/{username}")
    public List<OrderDTO> findByUsername(@PathVariable String username){
        List<OrderDTO> rs = orderService.findAllByUsername(username);
        return rs;
    }
    @GetMapping("all")
    public List<OrderDTO> findAll(){
        List<OrderDTO> rs = orderService.findAll();
        return rs;
    }
    @PatchMapping("/status/{id}")
    public void updateStatus(@PathVariable("id") Long  id){
        if(id != null){
            orderService.updateStatus(id);
        }
    }

    @GetMapping("/count")
    public long countOrder(){
        return orderService.findAll().stream().count();
    }

}
