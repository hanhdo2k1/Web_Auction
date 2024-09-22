package com.dolethanhtuan.api;

import com.dolethanhtuan.dto.DataDTO;
import com.dolethanhtuan.dto.OrderDTO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("data/")
public class DataAPI {
    @Autowired
    private ProductAPI productAPI;
    @Autowired
    private OrderAPI orderAPI;
    @Autowired
    private UserAPI userAPI;
    @Autowired
    private CategoryAPI categoryAPI;

    @SneakyThrows
    @GetMapping("")
    public DataDTO getData(){
        List<OrderDTO> orderDTOList = orderAPI.findAll();
        Double sales = 0.0;
        for (var i: orderDTOList) {
            sales+=i.getTotalPrice();
        }
        DataDTO data = DataDTO.builder().countCategory(categoryAPI.countCategory())
                .countProduct((long) productAPI.getAllProductAdmin().size())
                .countUser(userAPI.countUser())
                .countOrder(orderAPI.countOrder())
                .countOrderShipping(orderDTOList.stream().filter(o -> o.getStatus() == 1).count())
                .countOrderConfirm(orderDTOList.stream().filter(o -> o.getStatus() == 0).count())
                .countOrderSuccess(orderDTOList.stream().filter(o -> o.getStatus() == 3).count())
                .sales(sales)
                .build();
        return data;
    }
}
