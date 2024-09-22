package com.dolethanhtuan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "[order]")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private Integer status;
    private String fullName;
    private Double totalPrice;
    @Column(columnDefinition = "text")
    private String address;
    private String phoneNumber;
    private String shippingMethod;
    private String paymentMethod;
    private String note;
    private Date orderDate;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "order")
    private Set<OrderDetail> orderDetails = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY)
    private User user = new User();
}
