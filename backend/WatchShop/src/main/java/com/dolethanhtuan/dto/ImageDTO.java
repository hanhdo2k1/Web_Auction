package com.dolethanhtuan.dto;

import com.dolethanhtuan.entity.Product;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ImageDTO  implements Serializable {
    private Long id;
    private String imageName;
    private String imagePath;
    private Product product_image;
}
