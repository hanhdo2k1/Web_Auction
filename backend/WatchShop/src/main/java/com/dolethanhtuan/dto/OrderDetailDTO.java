package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.Order;
import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.embeddedID.OrderDetailId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderDetailDTO  implements Serializable {
    private Long orderId;
    private Long productId;
    private Double price;
    @JsonIgnore
    private Order order;
    private ProductDTO product;
}
