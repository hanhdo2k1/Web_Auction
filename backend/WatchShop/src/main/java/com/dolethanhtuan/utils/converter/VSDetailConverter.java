package com.dolethanhtuan.utils.converter;

import com.dolethanhtuan.dto.VSDetailDTO;
import com.dolethanhtuan.entity.Product;
import com.dolethanhtuan.entity.VSDetail;
import com.dolethanhtuan.repository.ProductRepository;
import com.dolethanhtuan.repository.UserRepository;
import com.dolethanhtuan.service.IProductService;
import com.dolethanhtuan.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class VSDetailConverter{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    public VSDetail toEntity(VSDetailDTO vsDetailDTO){
        return VSDetail.builder()
                .user(userRepository.findOneByUsername(vsDetailDTO.getUsername()).orElseThrow(null))
                .product(productRepository.findById(vsDetailDTO.getProductId()).orElseThrow(null))
                .price(vsDetailDTO.getPrice())
                .VSDate(vsDetailDTO.getVSDate())
                .build();
    }
    public VSDetailDTO toDTO(VSDetail vsDetail){
        return VSDetailDTO.builder()
                .username(vsDetail.getUser().getUsername())
                .fullName(vsDetail.getUser().getFullname())
                .productName(vsDetail.getProduct().getProductName())
                .productId(vsDetail.getProduct().getId())
                .VSDate(vsDetail.getVSDate())
                .price(vsDetail.getPrice())
                .build();
    }
    public Set<VSDetailDTO> toDTOList(Set<VSDetail> vsDetails){
        return vsDetails.stream().map(vsDetail -> toDTO(vsDetail)).collect(Collectors.toSet());
    }
}
