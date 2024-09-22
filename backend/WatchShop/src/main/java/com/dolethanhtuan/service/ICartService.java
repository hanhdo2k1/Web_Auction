package com.dolethanhtuan.service;

import com.dolethanhtuan.dto.CartDTO;
import com.dolethanhtuan.dto.CartDetailDTO;
import com.dolethanhtuan.entity.CartDetail;
import org.springframework.stereotype.Service;

@Service
public interface ICartService extends IGenericService<CartDTO> {
    CartDTO findCartByUsername(String username);
    void resetCartById(Long idCart);
}
