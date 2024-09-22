package com.dolethanhtuan.entity;

import com.dolethanhtuan.entity.embeddedID.CartDetailId;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "cart_detail")
public class CartDetail {
    @EmbeddedId
    private CartDetailId cartDetailId;
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product = new Product();
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cartId")
    @JoinColumn(name="cart_id")
    private Cart cart = new Cart();
}
