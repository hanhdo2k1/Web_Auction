package com.dolethanhtuan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "text")
    private String productName;
    @Column(columnDefinition = "text")
    private String description;
    @Column(columnDefinition = "text")
    private String thumbnail;
    private Double price;
    private Date startDate;
    private Integer status;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "product_image",cascade = CascadeType.ALL)
    private Set<Image> images = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "product",cascade = CascadeType.ALL)
    private Set<OrderDetail> orderDetails = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product",fetch = FetchType.LAZY)
    private Set<CartDetail> cartDetails = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product",fetch = FetchType.LAZY)
    private Set<VSDetail> VSDetails = new HashSet<>();
}
