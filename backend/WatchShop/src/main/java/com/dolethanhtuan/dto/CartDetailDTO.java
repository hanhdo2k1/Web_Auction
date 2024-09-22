package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.Cart;
import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.embeddedID.CartDetailId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
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
public class CartDetailDTO  implements Serializable {
    private Long cartId;
    private Long productId;
    private Double price;
    private ProductDTO product = new ProductDTO();
    @JsonIgnore
    private Cart cart = new Cart();
}
