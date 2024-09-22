package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.CartDetail;
import com.dolethanhtuan.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartDTO implements Serializable {
    private Long cartId;
    private Double totalPrice;
    private Integer status;
    @JsonIgnore
    private User user;
    private Set<CartDetailDTO> cartDetails = new HashSet<>();
}
