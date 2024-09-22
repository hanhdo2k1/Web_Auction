package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.OrderDetail;
import com.dolethanhtuan.entity.User;
import jakarta.persistence.Column;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderDTO  implements Serializable {
    private Long orderId;
    private Integer status;
    private String fullName;
    private String username;
    private Double totalPrice;
    private String address;
    private String phoneNumber;
    private String shippingMethod;
    private String paymentMethod;
    private int httpStatus;
    private Date orderDate;
    private String note;
    private Set<OrderDetailDTO> setOrders = new HashSet<>();
}
