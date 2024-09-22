package com.dolethanhtuan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(unique = true,nullable = false)
    private String username;
    @Column(columnDefinition = "text",nullable = false)
    private String password;
    private String bankAccount;
    private String fullname;
    private String email;
    private String phoneNumber;
    private Date ngaySinh;
    private String roleCode;
    private Integer status;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private Set<Order> orders = new HashSet<>();
    @OneToOne(mappedBy = "user",fetch = FetchType.LAZY)
    private Cart cart;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "user")
    private Set<VSDetail> VSDetails = new HashSet<>();
}
