package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VSDetailDTO  implements Serializable {
    private Long id;
    private String username;
    private String fullName;
    private Long productId;
    private String productName;
    private Date VSDate;
    private Double price;
}
