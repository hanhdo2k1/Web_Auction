package com.dolethanhtuan.entity;

import com.dolethanhtuan.entity.embeddedID.OrderDetailId;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "order_detail")
public class OrderDetail {
    @EmbeddedId
    private OrderDetailId orderDetailId = new OrderDetailId();
    private Double price;
    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
}
