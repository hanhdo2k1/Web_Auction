package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductDTO  implements Serializable {
    private Long id;
    private String productName;
    private String description;
    private String thumbnail;
    private Double price;
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date startDate;
    private Integer status;

    private Long categoryId;

    private Set<Image> images = new HashSet<>();
    @JsonIgnore
    private Set<OrderDetail> orderDetails = new HashSet<>();
    @JsonIgnore
    private Set<CartDetail> cartDetails = new HashSet<>();
    private Set<VSDetailDTO> VSDetails = new HashSet<>();
}
