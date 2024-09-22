package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
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
public class CategoryDTO implements Serializable {
    private Long id;
    private String categoryCode;
    private String categoryName;
    @JsonIgnore
    private Set<Product> products = new HashSet<>();
}
