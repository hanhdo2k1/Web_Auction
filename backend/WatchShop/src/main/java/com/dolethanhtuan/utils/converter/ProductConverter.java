package com.dolethanhtuan.utils.converter;

import com.dolethanhtuan.dto.ProductDTO;
import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.awt.print.Pageable;
import java.util.List;

@Component
public class ProductConverter {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CategoryRepository categoryRepository;

    public Product toEntity(Product productEOld,ProductDTO productDTONew){
        if(productDTONew.getProductName() != null){
            productEOld.setProductName(productDTONew.getProductName());
        }
        if(productDTONew.getDescription() != null){
            productEOld.setDescription(productDTONew.getDescription());
        }
        if(productDTONew.getPrice() != null){
            productEOld.setPrice(productDTONew.getPrice());
        }
        if(productDTONew.getStartDate() != null){
            productEOld.setStartDate(productDTONew.getStartDate());
        }
        if(productDTONew.getStatus() != null){
            productEOld.setStatus(productDTONew.getStatus());
        }
        if(productDTONew.getCategoryId() != null){
            productEOld.setCategory(categoryRepository.findById(productDTONew.getCategoryId()).orElseThrow(null));
        }
        return productEOld;
    }
}
