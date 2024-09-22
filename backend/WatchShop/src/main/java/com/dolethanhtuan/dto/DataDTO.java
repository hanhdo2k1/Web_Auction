package com.dolethanhtuan.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
@Data
@Builder
public class DataDTO implements Serializable {
    private Long countCategory;
    private Double sales;
    private Long countUser;
    private Long countProduct;
    private Long countOrder;
    private Long countOrderSuccess;
    private Long countOrderShipping;
    private Long countOrderConfirm;

}
