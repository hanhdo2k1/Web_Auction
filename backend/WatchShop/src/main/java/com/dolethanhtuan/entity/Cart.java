package com.dolethanhtuan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;
    private Double totalPrice;
    private Integer status;
    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "cart")
    private Set<CartDetail> cartDetails = new HashSet<>();
}
